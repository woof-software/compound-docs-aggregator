export type V2RewardsAtContract = {
  network: string;
  comptroller: string;
  tokenDecimals: number;
  atContractRaw: bigint;
  atContract: number; // formatted (human)
};
