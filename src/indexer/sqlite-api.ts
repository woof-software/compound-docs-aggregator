import Database from 'better-sqlite3';

export function createSqliteApi(path: string) {
  const db = new Database(path);
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
                                       market  TEXT NOT NULL,        -- V2: cToken, V3: comet proxy
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

  const upsertUser = db.prepare(`
    INSERT INTO users(network, version, market, user, created_at)
    VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(network, version, market, user) DO UPDATE SET
      created_at = CASE
                                                       WHEN excluded.created_at < users.created_at THEN excluded.created_at
                                                       ELSE users.created_at
    END
  `);

  const txUpsertUsers = db.transaction(
    (rows: Array<[string, number, string, string, number]>) => {
      for (const r of rows) upsertUser.run(...r);
    },
  );

  const fetchUsersPageByNetworkAndVersion = db.prepare(`
    SELECT market, user
    FROM users
    WHERE network = ? AND version = ?
    ORDER BY market ASC, user ASC
      LIMIT ? OFFSET ?
  `);

  return {
    db,

    // markets
    upsertMarket,
    listMarketsAll,
    listMarketsUpTo,

    // cursor (per network only)
    getCursor,
    setCursor,

    // users
    txUpsertUsers,
    fetchUsersPageByNetworkAndVersion,
  };
}
