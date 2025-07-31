export interface RootJson {
  comet: string; // Comet contract address
  configurator: string; // Configurator contract address
  rewards: string; // (optional) Rewards contract address
  bulker: string; // (optional) Bulker contract address
  bridgeReceiver?: string; // (optional) BridgeReceiver contract address
  [key: string]: any;
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
}

/**
 * Single curve entry with date of entry, value, value set date, previous value.
 */
export interface CurveEntry {
  date: string;
  value: number;
  valueSetDate?: string;
  previousValue?: number; // optional previous value
}

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
  CF: string; // AssetInfo.borrowCollateralFactor
  LF: string; // AssetInfo.liquidateCollateralFactor
  LP: string; // 100 - AssetInfo.liquidationFactor
  maxLeverage: string; // e.g. "11x"
}
export interface BaseTokenInfo {
  name: string; // asset name
  symbol: string; // e.g. "WBTC"
  address: string; // asset address
  decimals: number; // token.decimals()
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
  collaterals: CollateralInfo[];
  baseToken: BaseTokenInfo;
  COMP: string | null; // COMP address, if
  rewardsTable: RewardRecord | null;
}

export interface RewardsTable {
  marketRewards: RewardRecord[];
  totalDailyRewards: number; // e.g. "3 COMP"
  totalYearlyRewards: number; // e.g. "3 COMP * 365"
}

export interface NestedMarket {
  contracts: ContractsMap;
  curve: CurveMap;
  collaterals: CollateralInfo[];
  baseToken: BaseTokenInfo;
  COMP: string | null; // COMP address, if available
}
export interface NestedMarkets {
  markets: {
    [network: string]: {
      [market: string]: NestedMarket;
    };
  };
  rewards: RewardsTable;
  networkCompBalance: NetworkCompBalanceTable;
}
