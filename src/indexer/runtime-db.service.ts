import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

import { IndexerConfig, SqliteApi, SqliteDatabase } from './indexer.types';
import { ManifestsService } from './manifests.service';
import { ChunksService } from './chunks.service';
import { createSqliteApi } from './sqlite-api';
import { shouldLogPct } from '../common/utils/should-log-pct';

function sqlQuotePath(p: string): string {
  return `'${p.replaceAll("'", "''")}'`;
}

@Injectable()
export class RuntimeDbService {
  private readonly logger = new Logger(RuntimeDbService.name);

  private _runtimeDb?: SqliteDatabase;
  private set runtimeDb(runtimeDb: SqliteDatabase) {
    this._runtimeDb = runtimeDb;
  }
  private get runtimeDb(): SqliteDatabase {
    if (!this._runtimeDb) throw new Error('Runtime db must be defined');
    return this._runtimeDb;
  }
  private _api?: SqliteApi;

  public get api(): SqliteApi {
    if (!this._api) throw new Error('Runtime sqlite api must be defined');
    return this._api;
  }

  constructor(
    private readonly config: ConfigService,
    private readonly manifestSvc: ManifestsService,
    private readonly chunksSvc: ChunksService,
  ) {}

  private cfg(): IndexerConfig {
    return this.config.getOrThrow<IndexerConfig>('indexer');
  }

  private ensureRuntimeSchema(db: SqliteDatabase): void {
    db.exec(`
      CREATE TABLE IF NOT EXISTS markets (
        network TEXT NOT NULL,
        version INTEGER NOT NULL,
        market  TEXT NOT NULL,
        first_seen_block INTEGER NOT NULL,
        discovered_at INTEGER NOT NULL,
        PRIMARY KEY (network, version, market)
      );

      CREATE TABLE IF NOT EXISTS users (
        network TEXT NOT NULL,
        version INTEGER NOT NULL,
        market  TEXT NOT NULL,
        user    TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        PRIMARY KEY (network, version, market, user)
      );

      CREATE TABLE IF NOT EXISTS cursors (
        network TEXT NOT NULL,
        last_block INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        PRIMARY KEY (network)
      );

      CREATE INDEX IF NOT EXISTS idx_markets_net_block ON markets(network, first_seen_block);
      CREATE INDEX IF NOT EXISTS idx_users_net_ver_market ON users(network, version, market);
      CREATE INDEX IF NOT EXISTS idx_users_cursor ON users(network, version, created_at, market, user);
    `);
  }

  private ensureMetaSchema(metaPath: string): void {
    fs.mkdirSync(path.dirname(metaPath), { recursive: true });
    const db = new Database(metaPath);
    db.pragma('journal_mode = DELETE');
    db.pragma('synchronous = FULL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS markets (
        network TEXT NOT NULL,
        version INTEGER NOT NULL,
        market  TEXT NOT NULL,
        first_seen_block INTEGER NOT NULL,
        discovered_at INTEGER NOT NULL,
        PRIMARY KEY (network, version, market)
      );

      CREATE TABLE IF NOT EXISTS cursors (
        network TEXT NOT NULL,
        last_block INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        PRIMARY KEY (network)
      );
    `);
    db.close();
  }

  private prepareRuntimeFiles(args: {
    runtimePath: string;
    rebuild: boolean;
  }): void {
    const { runtimePath, rebuild } = args;

    // Always ensure directory exists (even if we reuse DB).
    fs.mkdirSync(path.dirname(runtimePath), { recursive: true });

    if (!rebuild) return;

    // If we rebuild, remove db + wal/shm to avoid stale state.
    for (const suffix of ['', '-wal', '-shm']) {
      const p = runtimePath + suffix;
      if (fs.existsSync(p)) fs.rmSync(p, { force: true });
    }
  }

  private assembleRuntime(): void {
    const cfg = this.cfg();

    if (!fs.existsSync(cfg.repoMetaPath)) {
      throw new Error(`meta.sqlite not found at: ${cfg.repoMetaPath}`);
    }
    if (!fs.existsSync(cfg.manifestPath)) {
      throw new Error(`manifest.json not found at: ${cfg.manifestPath}`);
    }
    if (!fs.existsSync(cfg.repoUsersDir)) {
      throw new Error(`users dir not found at: ${cfg.repoUsersDir}`);
    }

    // ----------------------------
    // 1) Meta import (markets + cursors)
    // ----------------------------
    this.logger.verbose(`[assemble][meta] 0%`);

    const metaAbs = path.resolve(cfg.repoMetaPath);
    this.runtimeDb.exec(`ATTACH ${sqlQuotePath(metaAbs)} AS meta;`);

    try {
      this.runtimeDb.exec('BEGIN');

      // markets
      this.runtimeDb
        .prepare(
          `
        INSERT OR REPLACE INTO markets(network, version, market, first_seen_block, discovered_at)
        SELECT network, version, market, first_seen_block, discovered_at
        FROM meta.markets;
      `,
        )
        .run();

      this.logger.verbose(`[assemble][meta] 50% (markets)`);

      // cursors
      this.runtimeDb
        .prepare(
          `
        INSERT OR REPLACE INTO cursors(network, last_block, updated_at)
        SELECT network, last_block, updated_at
        FROM meta.cursors;
      `,
        )
        .run();

      this.logger.verbose(`[assemble][meta] 100% (cursors)`);

      this.runtimeDb.exec('COMMIT');

      const cursors = this.runtimeDb
        .prepare(`SELECT COUNT(*) AS c FROM cursors`)
        .get() as { c: number };

      if (cursors.c === 0) {
        throw new Error(
          `assembleRuntime: 0 cursors after meta import (empty/wrong meta.sqlite): ${cfg.repoMetaPath}`,
        );
      }

      this.logger.log(`after meta import: cursors=${cursors.c}`);
    } catch (e) {
      try {
        this.runtimeDb.exec('ROLLBACK');
      } catch {}
      throw e;
    } finally {
      this.runtimeDb.exec(`DETACH meta;`);
    }

    // ----------------------------
    // 2) Users import (repo chunks -> runtime)
    // Progress by EXISTING chunk files on disk.
    // ----------------------------
    const manifest = this.manifestSvc.value;

    let declaredChunks = 0;
    const existingChunkFiles: Array<{ file: string; abs: string }> = [];

    for (const s of manifest.series) {
      for (const ch of s.chunks) {
        declaredChunks += 1;
        const abs = path.resolve(cfg.repoUsersDir, ch.file);
        if (fs.existsSync(abs)) existingChunkFiles.push({ file: ch.file, abs });
      }
    }

    const total = existingChunkFiles.length;
    let done = 0;
    let insertedTotal = 0;
    let lastPct = -1;

    this.logger.verbose(
      `[assemble][users] 0% (existingChunks=${total}/${declaredChunks})`,
    );

    for (const ch of existingChunkFiles) {
      this.runtimeDb.exec(`ATTACH ${sqlQuotePath(ch.abs)} AS ch;`);

      try {
        this.runtimeDb.exec('BEGIN');

        const insertFromChunkStmt = this.runtimeDb.prepare(`
    INSERT OR IGNORE INTO users(network, version, market, user, created_at)
    SELECT network, version, market, user, created_at
    FROM ch.users;
  `);

        const res = insertFromChunkStmt.run();
        insertedTotal += res.changes;

        this.runtimeDb.exec('COMMIT');
      } catch (e) {
        try {
          this.runtimeDb.exec('ROLLBACK');
        } catch {}
        throw e;
      } finally {
        this.runtimeDb.exec(`DETACH ch;`);
      }

      done += 1;

      const pct = total === 0 ? 100 : Math.floor((done * 100) / total);
      if (shouldLogPct(lastPct, pct, 5)) {
        lastPct = pct;
        this.logger.verbose(
          `[assemble][users] ${pct}% (${done}/${total}) insertedTotal=${insertedTotal} lastChunk=${ch.file}`,
        );
      }
    }

    if (total === 0) {
      this.logger.verbose(
        `[assemble][users] 100% (no chunk files found on disk)`,
      );
    } else if (lastPct < 100) {
      this.logger.verbose(
        `[assemble][users] 100% (${done}/${total}) insertedTotal=${insertedTotal}`,
      );
    }

    const users = this.runtimeDb
      .prepare(`SELECT COUNT(*) AS c FROM users`)
      .get() as { c: number };

    this.logger.log(`after users import: users=${users.c}`);
  }

  private syncMetaFromRuntime(): void {
    const cfg = this.cfg();

    this.ensureMetaSchema(cfg.repoMetaPath);

    this.logger.verbose(`[sync-meta] 0%`);

    this.runtimeDb.exec(
      `ATTACH ${sqlQuotePath(path.resolve(cfg.repoMetaPath))} AS meta;`,
    );

    this.runtimeDb.exec('BEGIN');
    try {
      // markets
      this.runtimeDb.exec(`DELETE FROM meta.markets;`);
      this.runtimeDb
        .prepare(
          `
        INSERT INTO meta.markets(network, version, market, first_seen_block, discovered_at)
        SELECT network, version, market, first_seen_block, discovered_at
        FROM main.markets;
      `,
        )
        .run();

      this.logger.verbose(`[sync-meta] 50% (markets)`);

      // cursors
      this.runtimeDb.exec(`DELETE FROM meta.cursors;`);
      this.runtimeDb
        .prepare(
          `
        INSERT INTO meta.cursors(network, last_block, updated_at)
        SELECT network, last_block, updated_at
        FROM main.cursors;
      `,
        )
        .run();

      this.logger.verbose(`[sync-meta] 100% (cursors)`);

      this.runtimeDb.exec('COMMIT');
    } catch (e) {
      this.runtimeDb.exec('ROLLBACK');
      throw e;
    } finally {
      this.runtimeDb.exec(`DETACH meta;`);
    }
  }

  public async assemble(): Promise<void> {
    const cfg = this.cfg();

    this.manifestSvc.load(cfg.manifestPath);

    const runtimeExists = fs.existsSync(cfg.runtimePath);

    // If runtime already exists, we reuse it, so no cleanup.
    // If not, we rebuild from repo.
    this.prepareRuntimeFiles({
      runtimePath: cfg.runtimePath,
      rebuild: !runtimeExists,
    });

    const db = new Database(cfg.runtimePath);
    this.runtimeDb = db;
    this.runtimeDb.pragma('journal_mode = WAL');
    this.runtimeDb.pragma('synchronous = NORMAL');

    this.ensureRuntimeSchema(this.runtimeDb);

    this._api = createSqliteApi(db);

    if (!runtimeExists) {
      this.assembleRuntime();
      this.logger.log(`Runtime DB assembled: ${cfg.runtimePath}`);
    } else {
      this.logger.log(
        `Runtime DB exists, skipping assemble: ${cfg.runtimePath}`,
      );
    }
  }

  public async flush(): Promise<void> {
    if (!this._runtimeDb) return;

    const cfg = this.cfg();

    this.chunksSvc.flushNewUsersFromRuntime({
      runtimeDb: this.runtimeDb,
      repoUsersDir: cfg.repoUsersDir,
    });

    this.manifestSvc.save(cfg.manifestPath);

    this.syncMetaFromRuntime();

    this.runtimeDb.close();
    this._runtimeDb = undefined;

    this.logger.log(`Repo updated (meta + tail chunks), runtime closed.`);
  }
}
