import { Address } from 'common/types/address';

export interface RootJson {
  comet: Address; // Comet contract address
  configurator: Address; // Configurator contract address
  rewards: Address; // (optional) Rewards contract address
  bulker: Address; // (optional) Bulker contract address
  bridgeReceiver?: Address; // (optional) BridgeReceiver contract address
  [key: string]: any;
}

export type RewardConfig = readonly [Address, ...unknown[]];

export interface AssetInfo {
  asset: Address;
  priceFeed: Address;
  decimals: bigint;
  borrowCollateralFactor: bigint;
  liquidateCollateralFactor: bigint;
  liquidationFactor: bigint;
  supplyCap: bigint;
}

export interface CometContract {
  baseToken(): Promise<Address>;
  baseTokenPriceFeed(): Promise<Address>;
  extensionDelegate(): Promise<Address>;
  governor(): Promise<Address>;
  baseTrackingSupplySpeed(): Promise<bigint>;
  baseTrackingBorrowSpeed(): Promise<bigint>;
  numAssets(): Promise<bigint>;
  getAssetInfo(index: number): Promise<AssetInfo>;
  supplyKink(): Promise<bigint>;
  supplyPerSecondInterestRateSlopeLow(): Promise<bigint>;
  supplyPerSecondInterestRateSlopeHigh(): Promise<bigint>;
  supplyPerSecondInterestRateBase(): Promise<bigint>;
  borrowKink(): Promise<bigint>;
  borrowPerSecondInterestRateSlopeLow(): Promise<bigint>;
  borrowPerSecondInterestRateSlopeHigh(): Promise<bigint>;
  borrowPerSecondInterestRateBase(): Promise<bigint>;
}

export interface CometExtensionContract {
  symbol(): Promise<string>;
}

export interface ConfiguratorContract {
  factory(cometAddress: Address): Promise<Address>;
}

export interface TimelockContract {
  admin(): Promise<Address>;
}

export interface RewardsConfigContract {
  rewardConfig(cometAddress: Address): Promise<RewardConfig>;
}

export interface RewardsOwedContract {
  getRewardOwed(
    cometAddress: Address,
    userAddress: Address,
  ): Promise<[Address, bigint]>;
}

export interface Erc20Contract {
  name(): Promise<string>;
  symbol(): Promise<string>;
  decimals(): Promise<bigint>;
  balanceOf(owner: Address): Promise<bigint>;
}

export interface ProxyAddressInfo {
  type: string;
  address: Address | null;
}

/**
 * Single contract entry with its name, on‐chain address, and GitHub link.
 */
export interface ContractEntry {
  name: string;
  address: string;
  githubContract?: string;
}

/**
 * All the contracts defined in roots.json for a Comet market.
 */
export interface ContractsMap {
  comet: string;
  cometImplementation: string;
  cometExtension: string;
  configurator: string;
  configuratorImplementation: string;
  cometAdmin: string;
  cometFactory: string;
  rewards: string;
  bulker: string;
  governor: string;
  timelock: string;
  comp?: string;
  svrFeeRecipient?: string;
  svrFeeReceiver?: string;
}

/**
 * Single curve entry with date of entry, value, value set date, previous value.
 */
export interface CurveEntry {
  date: string;
  value: string;
  valueSetDate?: string;
  previousValue?: string; // optional previous value
}

export type CurveKey =
  | 'supplyKink'
  | 'supplyPerSecondInterestRateSlopeLow'
  | 'supplyPerSecondInterestRateSlopeHigh'
  | 'supplyPerSecondInterestRateBase'
  | 'borrowKink'
  | 'borrowPerSecondInterestRateSlopeLow'
  | 'borrowPerSecondInterestRateSlopeHigh'
  | 'borrowPerSecondInterestRateBase';

/**
 * All the curve parameters we fetch from the Comet contract.
 * Each is a BigNumber.toString() result.
 */
export interface CurveMap {
  supplyKink: CurveEntry;
  supplyPerSecondInterestRateSlopeLow: CurveEntry;
  supplyPerSecondInterestRateSlopeHigh: CurveEntry;
  supplyPerSecondInterestRateBase: CurveEntry;
  borrowKink: CurveEntry;
  borrowPerSecondInterestRateSlopeLow: CurveEntry;
  borrowPerSecondInterestRateSlopeHigh: CurveEntry;
  borrowPerSecondInterestRateBase: CurveEntry;
}

/**
 * Base token information
 */
export interface BaseTokenInfo {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  priceFeed: string;
}

/**
 * A single collateral/asset entry as returned by the Configurator.
 */
export interface CollateralInfo {
  idx: number;
  date: string; // ISO date or "Date of record"
  name: string; // asset name
  symbol: string; // e.g. "WBTC"
  address: string; // asset address
  decimals: number; // token.decimals()
  priceFeedAddress: string; // on‐chain feed address
  priceFeedProvider: 'Chainlink' | 'Redstone' | 'API3' | string;
  oevEnabled: boolean; // open‐ended‐value flag
  capEnabled: boolean; // CAPO flag
  rateType: string; // e.g. "Market / Exchange rate"
  CF: string; // AssetInfo.borrowCollateralFactor (formatted as percentage)
  LF: string; // AssetInfo.liquidateCollateralFactor (formatted as percentage)
  LP: string; // 100 - AssetInfo.liquidationFactor (formatted as percentage)
  maxLeverage: string; // e.g. "11x"
  borrowCollateralFactorRaw: string; // Raw borrowCollateralFactor value (wei format, 1e18 = 100%)
  liquidateCollateralFactorRaw: string; // Raw liquidateCollateralFactor value (wei format, 1e18 = 100%)
  liquidationFactorRaw: string; // Raw liquidationFactor value (wei format, 1e18 = 100%)
  supplyCapRaw: string; // Raw supplyCap value (uint128, 0)
  supplyCapFormatted: string; // Formatted supplyCap (human-readable: K/M/B or "0")
}

/**
 * One record in the rewards summary (Date of record + computed yields).
 */
export interface RewardRecord {
  date: string; // ISO date or "Date of record"
  network: string; // e.g. "Arbitrum"
  market: string; // e.g. "USDC.e"
  dailyRewards: number; // e.g. "3 COMP"
  yearlyRewards: number; // e.g. "3 COMP * 365"
  lendDailyRewards: number; // e.g. "1 COMP"
  borrowDailyRewards: number; // e.g. "2 COMP"
  compAmountOnRewardContract: number; // e.g. raw COMP balance on the rewards contract
  lendAprBoost?: number; // optional APR boost number
  borrowAprBoost?: number; // optional APR boost number
}

export interface NetworkCompBalanceRecord {
  idx: number;
  date: string; // ISO date or "Date of record"
  network: string; // e.g. "Arbitrum"
  currentCompBalance: number; // e.g. "100 COMP"
}

export interface NetworkCompBalanceTable {
  networks: NetworkCompBalanceRecord[];
  totalCompBalance: number; // total COMP balance across all networks
}

/**
 * The full JSON shape for one Comet market.
 */
export interface MarketData {
  network: string;
  market: string;
  contracts: ContractsMap;
  curve: CurveMap;
  baseToken: BaseTokenInfo;
  collaterals: CollateralInfo[];
  rewardsTable: RewardRecord | null;
}

export interface RewardsTable {
  marketRewards: RewardRecord[];
  totalDailyRewards: number; // e.g. "3 COMP"
  totalYearlyRewards: number; // e.g. "3 COMP * 365"
}

export interface NestedMarkets {
  markets: {
    [network: string]: {
      [market: string]: {
        contracts: ContractsMap;
        curve: CurveMap;
        baseToken: BaseTokenInfo;
        collaterals: CollateralInfo[];
      };
    };
  };
  rewards: RewardsTable;
  networkCompBalance: NetworkCompBalanceTable;
}
