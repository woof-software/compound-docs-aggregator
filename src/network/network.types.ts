export interface NetworkConfig {
  network: string;
  chainId: number;
  url: string;
  // Indexer
  indexingEnabled: boolean;
  reorgWindow: number;
  comptrollerV2?: string;
  configuratorV3?: string;
  rewardsV3?: string;
  startBlock?: number;
  // Ows
  rewardsCalcEnabled: boolean;
  comp?: string; // required if comptrollerV2 !== undefined
  svrFeeRecipient?: string; // optional SVR protocol fee recipient
}
