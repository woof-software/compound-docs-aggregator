import Database from 'better-sqlite3';
import { SqliteApi, SqliteDatabase } from './indexer.types';

export function createSqliteApi(pathOrDb: string | SqliteDatabase): SqliteApi {
  const db = typeof pathOrDb === 'string' ? new Database(pathOrDb) : pathOrDb;

  // Runtime DB lives in .runtime => WAL ok.
  // Repo DBs (meta/chunks) we will open separately with journal_mode=DELETE.
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS markets (
      network TEXT NOT NULL,
      version INTEGER NOT NULL,     -- 2 | 3
      market  TEXT NOT NULL,        -- V2: cToken, V3: comet proxy
      first_seen_block INTEGER NOT NULL,
      discovered_at INTEGER NOT NULL,
      PRIMARY KEY (network, version, market)
    );

    CREATE TABLE IF NOT EXISTS users (
      network TEXT NOT NULL,
      version INTEGER NOT NULL,     -- 2 | 3
      market  TEXT NOT NULL,
      user    TEXT NOT NULL,
      created_at INTEGER NOT NULL,  -- earliest timestamp we saw this user in this market
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

  const upsertMarket = db.prepare(`
    INSERT INTO markets(network, version, market, first_seen_block, discovered_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(network, version, market) DO UPDATE SET
      first_seen_block = CASE
        WHEN excluded.first_seen_block < markets.first_seen_block THEN excluded.first_seen_block
        ELSE markets.first_seen_block
      END,
      discovered_at = CASE
        WHEN excluded.discovered_at < markets.discovered_at THEN excluded.discovered_at
        ELSE markets.discovered_at
      END
  `);

  const listMarketsAll = db.prepare(`
    SELECT version, market, first_seen_block
    FROM markets
    WHERE network = ?
    ORDER BY first_seen_block ASC
  `);

  const listMarketsUpTo = db.prepare(`
    SELECT version, market, first_seen_block
    FROM markets
    WHERE network = ? AND first_seen_block <= ?
    ORDER BY first_seen_block ASC
  `);

  const getCursor = db.prepare(`
    SELECT last_block
    FROM cursors
    WHERE network = ?
  `);

  const setCursor = db.prepare(`
    INSERT INTO cursors(network, last_block, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(network) DO UPDATE SET
      last_block = excluded.last_block,
      updated_at = excluded.updated_at
  `);

  // ✅ IMPORTANT: no UPDATE, append-friendly
  const insertUser = db.prepare(`
    INSERT INTO users(network, version, market, user, created_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(network, version, market, user) DO NOTHING
  `);

  const txUpsertUsers = db.transaction(
    (rows: Array<[string, number, string, string, number]>) => {
      for (const r of rows) insertUser.run(...r);
    },
  );

  const fetchUsersPageByNetworkAndVersion = db.prepare(`
    SELECT market, user
    FROM users
    WHERE network = ? AND version = ?
    ORDER BY market ASC, user ASC
    LIMIT ? OFFSET ?
  `);

  // ✅ Cursor pagination (no OFFSET)
  const fetchUsersCursorPageByNetworkAndVersion = db.prepare(`
    SELECT market, user, created_at
    FROM users
    WHERE network = ? AND version = ?
      AND (
        created_at > ?
        OR (created_at = ? AND (market > ? OR (market = ? AND user > ?)))
      )
    ORDER BY created_at ASC, market ASC, user ASC
    LIMIT ?
  `);

  const countUsersByNetworkAndVersion = db.prepare(`
  SELECT COUNT(*) AS cnt
  FROM users
  WHERE network = ? AND version = ?
`);

  return {
    db,

    // markets
    upsertMarket,
    listMarketsAll,
    listMarketsUpTo,

    // cursor
    getCursor,
    setCursor,

    // users
    txUpsertUsers,
    fetchUsersPageByNetworkAndVersion,
    fetchUsersCursorPageByNetworkAndVersion,
    countUsersByNetworkAndVersion,
  };
}
