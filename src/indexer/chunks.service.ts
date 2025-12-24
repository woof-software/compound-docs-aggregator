import { Injectable, Logger } from '@nestjs/common';
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import {
  ManifestsService,
  UsersChunkInfo,
  UsersSeries,
} from './manifests.service';
import { SqliteDatabase } from './indexer.types';
import { shouldLogPct } from '../common/utils/should-log-pct';

@Injectable()
export class ChunksService {
  private readonly logger = new Logger(ChunksService.name);

  constructor(private readonly manifestSvc: ManifestsService) {}

  private ensureUsersChunkSchema(db: SqliteDatabase): void {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        network TEXT NOT NULL,
        version INTEGER NOT NULL,
        market  TEXT NOT NULL,
        user    TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        PRIMARY KEY (network, version, market, user)
      );
      CREATE INDEX IF NOT EXISTS idx_users_net_ver_market ON users(network, version, market);
      CREATE INDEX IF NOT EXISTS idx_users_cursor ON users(network, version, created_at, market, user);
    `);
  }

  private openChunkDb(chunkPath: string): SqliteDatabase {
    fs.mkdirSync(path.dirname(chunkPath), { recursive: true });
    const db = new Database(chunkPath);
    db.pragma('journal_mode = DELETE'); // IMPORTANT: no -wal/-shm in repo
    db.pragma('synchronous = FULL');
    this.ensureUsersChunkSchema(db);
    return db;
  }

  private getActiveChunk(
    series: UsersSeries,
  ): { info: UsersChunkInfo; index: number } | null {
    if (series.chunks.length === 0) return null;
    return {
      info: series.chunks[series.chunks.length - 1]!,
      index: series.chunks.length - 1,
    };
  }

  public flushNewUsersFromRuntime(args: {
    runtimeDb: SqliteDatabase;
    repoUsersDir: string;
  }): void {
    const { runtimeDb, repoUsersDir } = args;

    const combos = runtimeDb
      .prepare(
        `SELECT DISTINCT network, version FROM users ORDER BY network ASC, version ASC`,
      )
      .all() as Array<{ network: string; version: number }>;

    const manifest = this.manifestSvc.value;

    for (const c of combos) {
      const network = c.network;
      const version = c.version as 2 | 3;

      const series = this.manifestSvc.getOrCreateSeries(network, version);
      const watermark = series.lastCreatedAt ?? 0;

      const newRows = runtimeDb
        .prepare(
          `
        SELECT network, version, market, user, created_at
        FROM users
        WHERE network = ? AND version = ? AND created_at > ?
        ORDER BY created_at ASC, market ASC, user ASC
      `,
        )
        .all(network, version, watermark) as Array<any>;

      if (newRows.length === 0) continue;

      const pctTotal = newRows.length;
      let pctProcessed = 0;
      let pctInserted = 0;
      let pctLast = -1;

      this.logger.verbose(
        `[flush][${network}/v${version}] 0% (newRows=${pctTotal} watermark=${watermark} chunkRows=${manifest.chunkRows})`,
      );

      let active = this.getActiveChunk(series);
      if (!active) {
        const file = this.manifestSvc.chunkFileName(network, version, 0);
        series.chunks.push({ file, rows: 0, endCreatedAt: 0 });
        active = this.getActiveChunk(series)!;
      }

      let chunkDb = this.openChunkDb(path.join(repoUsersDir, active.info.file));
      let insert = chunkDb.prepare(`
        INSERT INTO users(network, version, market, user, created_at)
        VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(network, version, market, user) DO NOTHING
      `);

      const openNewChunk = () => {
        chunkDb.close();

        const nextIdx = series.chunks.length;
        const file = this.manifestSvc.chunkFileName(network, version, nextIdx);
        series.chunks.push({
          file,
          rows: 0,
          endCreatedAt: series.lastCreatedAt,
        });

        active = this.getActiveChunk(series)!;
        chunkDb = this.openChunkDb(path.join(repoUsersDir, active!.info.file));
        insert = chunkDb.prepare(`
        INSERT INTO users(network, version, market, user, created_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(network, version, market, user) DO NOTHING
      `);
      };

      try {
        chunkDb.exec('BEGIN');

        for (const r of newRows) {
          pctProcessed += 1;

          const createdAt = Number(r.created_at);

          if (createdAt < series.lastCreatedAt) {
            throw new Error(
              `[flush] Non-monotonic created_at for ${network}/v${version}: ${createdAt} < watermark ${series.lastCreatedAt}`,
            );
          }

          const res = insert.run(
            r.network,
            r.version,
            r.market,
            r.user,
            createdAt,
          );
          if (res.changes === 1) {
            active!.info.rows += 1;
            pctInserted += 1;
          }

          active!.info.endCreatedAt = createdAt;
          series.lastCreatedAt = createdAt;

          const pct = Math.floor((pctProcessed * 100) / pctTotal);
          if (shouldLogPct(pctLast, pct, 5)) {
            pctLast = pct;
            this.logger.verbose(
              `[flush][${network}/v${version}] ${pct}% processed=${pctProcessed}/${pctTotal} inserted=${pctInserted} activeChunk=${
                active!.info.file
              } activeRows=${active!.info.rows}`,
            );
          }

          if (active!.info.rows >= manifest.chunkRows) {
            chunkDb.exec('COMMIT');
            openNewChunk();
            chunkDb.exec('BEGIN');
          }
        }

        chunkDb.exec('COMMIT');
      } catch (e) {
        try {
          chunkDb.exec('ROLLBACK');
        } catch {}
        throw e;
      } finally {
        chunkDb.close();
      }
    }
  }
}
