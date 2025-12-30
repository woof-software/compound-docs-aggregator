import type BetterSqlite3 from 'better-sqlite3';
import { CompoundVersion } from '../common/types/compound-version';

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

  deleteOwesByVersion: BetterSqlite3.Statement;
  upsertOwe: BetterSqlite3.Statement;
  txUpsertOwes: BetterSqlite3.Transaction;
  fetchOwesPageByVersion: BetterSqlite3.Statement;
  iterateOwesByVersion: BetterSqlite3.Statement;
  countOwesByVersion: BetterSqlite3.Statement;
}

export interface IndexerUser {
  rewardsAddress: string;
  cometAddress: string;
  userAddress: string;
}
/**
 * network -> users
 */
export type IndexerUsers = Record<string, IndexerUser[]>;

////

export interface OwedRow {
  marketAddress: string; // V2: comptroller, V3: comet
  userAddress: string;
  owed: bigint;
}
