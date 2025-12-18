import Database from 'better-sqlite3';

export function createSqliteApi(path: string) {
  const db = new Database(path);
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      network TEXT NOT NULL,
      comet   TEXT NOT NULL,
      user    TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      PRIMARY KEY (network, comet, user)
    );

    CREATE TABLE IF NOT EXISTS comets (
      network TEXT NOT NULL,
      comet   TEXT NOT NULL,
      first_seen_block INTEGER NOT NULL,
      discovered_at INTEGER NOT NULL,
      PRIMARY KEY (network, comet)
    );

    CREATE TABLE IF NOT EXISTS cursors (
      network TEXT NOT NULL,
      kind    TEXT NOT NULL,   -- 'configuratorV3' | 'cometV3'
      address TEXT NOT NULL,   -- configurator address or comet proxy
      last_block INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (network, kind, address)
    );

    CREATE INDEX IF NOT EXISTS idx_users_network_comet ON users(network, comet);
  `);

  const upsertUser = db.prepare(`
    INSERT INTO users(network, comet, user, created_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(network, comet, user) DO UPDATE SET
      created_at = CASE
        WHEN excluded.created_at < users.created_at THEN excluded.created_at
        ELSE users.created_at
      END
  `);

  const txUpsertUsers = db.transaction(
    (rows: Array<[string, string, string, number]>) => {
      for (const r of rows) upsertUser.run(...r);
    },
  );

  const upsertComet = db.prepare(`
    INSERT INTO comets(network, comet, first_seen_block, discovered_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(network, comet) DO UPDATE SET
      first_seen_block = CASE
        WHEN excluded.first_seen_block < comets.first_seen_block THEN excluded.first_seen_block
        ELSE comets.first_seen_block
      END,
      discovered_at = CASE
        WHEN excluded.discovered_at < comets.discovered_at THEN excluded.discovered_at
        ELSE comets.discovered_at
      END
  `);

  const listComets = db.prepare(`
    SELECT comet, first_seen_block
    FROM comets
    WHERE network = ?
    ORDER BY first_seen_block ASC
  `);

  const getCursor = db.prepare(`
    SELECT last_block
    FROM cursors
    WHERE network = ? AND kind = ? AND address = ?
  `);

  const setCursor = db.prepare(`
    INSERT INTO cursors(network, kind, address, last_block, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(network, kind, address) DO UPDATE SET
      last_block = excluded.last_block,
      updated_at = excluded.updated_at
  `);

  const fetchUsersPage = db.prepare(`
    SELECT network, comet, user
    FROM users
    ORDER BY network ASC, comet ASC, user ASC
    LIMIT ? OFFSET ?
  `);

  const fetchUsersPageByNetwork = db.prepare(`
  SELECT comet, user
  FROM users
  WHERE network = ?
  ORDER BY comet ASC, user ASC
  LIMIT ? OFFSET ?
`);

  db.exec(`
  CREATE INDEX IF NOT EXISTS idx_comets_network_first_seen
  ON comets(network, first_seen_block);
`);

  const listCometsActiveAt = db.prepare(`
  SELECT comet
  FROM comets
  WHERE network = ? AND first_seen_block <= ?
  ORDER BY first_seen_block ASC
`);

  const listCometBoundariesInRange = db.prepare(`
  SELECT DISTINCT first_seen_block
  FROM comets
  WHERE network = ? AND first_seen_block BETWEEN ? AND ?
  ORDER BY first_seen_block ASC
`);


  return {
    db,
    txUpsertUsers,
    upsertComet,
    listComets,
    getCursor,
    setCursor,
    fetchUsersPage,
    fetchUsersPageByNetwork,
    listCometsActiveAt,
    listCometBoundariesInRange,
  };
}
