import type BetterSqlite3 from 'better-sqlite3';

export type IndexerConfig = {
  repoMetaPath: string;
  repoUsersDir: string;
  manifestPath: string;
  runtimeDir: string;
  runtimePath: string;
};

export type SqliteDatabase = BetterSqlite3.Database;
export interface SqliteApi {
  db: BetterSqlite3.Database;

  upsertMarket: BetterSqlite3.Statement;
  listMarketsAll: BetterSqlite3.Statement;
  listMarketsUpTo: BetterSqlite3.Statement;

  getCursor: BetterSqlite3.Statement;
  setCursor: BetterSqlite3.Statement;

  txUpsertUsers: BetterSqlite3.Transaction;
  fetchUsersPageByNetworkAndVersion: BetterSqlite3.Statement;
  fetchUsersCursorPageByNetworkAndVersion: BetterSqlite3.Statement;
  countUsersByNetworkAndVersion: BetterSqlite3.Statement;
}

/**
 * network -> users
 */
export type IndexerUsers = Record<
  string,
  {
    rewardsAddress: string;
    cometAddress: string;
    userAddress: string;
  }[]
>;
