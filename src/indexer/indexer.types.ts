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

// V2: userAddress (+ owed)
export type OwedRowV2 = Pick<IndexerUser, 'userAddress'> & {
  owed: bigint;
};

// V3: cometAddress + userAddress (+ owed)
export type OwedRowV3 = Pick<IndexerUser, 'cometAddress' | 'userAddress'> & {
  owed: bigint;
};

export type UpsertOwesBatchArgs =
  | {
      version: CompoundVersion.V2;
      network: string;
      market: string; // comptroller (V2)
      rows: OwedRowV2[];
      updatedAt?: number;
    }
  | {
      version: CompoundVersion.V3;
      network: string;
      rows: OwedRowV3[];
      updatedAt?: number;
    };

export type FetchOwesRowV2 = {
  network: string;
  comptroller: string;
  userAddress: string;
  owed: bigint;
};

export type FetchOwesRowV3 = {
  network: string;
  cometAddress: string;
  userAddress: string;
  owed: bigint;
};
