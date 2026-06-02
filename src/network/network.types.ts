export interface NetworkConfig {
  network: string;
  chainId: number;
  url: string;
  batchMaxCount?: number;
  sortPosition: number; // Position matches compound.finance/markets page
  blockscanOrigin: string; // Blockscan explorer URL
  displayName: string; // Network display name for deployment key
  comp?: string; // COMP token (shown in contracts table when present)
  svrFeeRecipient?: string; // optional SVR protocol fee recipient
  svrFeeReceiver?: string; // optional SVR protocol fee receiver
}
