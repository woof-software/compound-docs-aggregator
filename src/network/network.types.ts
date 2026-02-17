export interface NetworkConfig {
  network: string;
  chainId: number;
  url: string;
  batchMaxCount?: number;
  sortPosition: number; // Position matches compound.finance/markets page
  blockscanOrigin: string; // Blockscan explorer URL
  displayName: string; // Network display name for deployment key
  // Indexer
  indexingEnabled: boolean;
  reorgWindow: number;
  comptrollerV2?: string;
  configuratorV3?: string;
  rewardsV3?: string;
  startBlock?: number;
  // Ows
  rewardsCalcEnabled: boolean;
  comp?: string; // required if comptrollerV2 !== undefined / displayed in the list of contracts
  svrFeeRecipient?: string; // optional SVR protocol fee recipient
  svrFeeReceiver?: string; // optional SVR protocol fee receiver
}
