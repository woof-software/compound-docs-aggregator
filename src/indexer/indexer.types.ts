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
