/**
 * Gets network sort order for consistent ordering
 * Order matches compound.finance/markets page
 */
export function getNetworkSortOrder(networkName: string): number {
  const orderMap: Record<string, number> = {
    mainnet: 1,
    optimism: 2,
    unichain: 3,
    polygon: 4,
    ronin: 5,
    mantle: 6,
    base: 7,
    arbitrum: 8,
    linea: 9,
    scroll: 10,
    avalanche: 11,
    sepolia: 12,
    mumbai: 13,
    'base-sepolia': 14,
    fuji: 15,
  };

  const sortOrder = orderMap[networkName.toLowerCase()];
  if (sortOrder === undefined) {
    throw new Error(`Network sort order not found for network: ${networkName}`);
  }
  return sortOrder;
}
