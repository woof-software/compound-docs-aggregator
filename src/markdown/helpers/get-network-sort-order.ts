/**
 * Gets network sort order for consistent ordering
 * Order matches compound.finance/markets page
 */
export function getNetworkSortOrder(networkName: string): number {
  const orderMap: Record<string, number> = {
    mainnet: 1,
    arbitrum: 2,
    base: 3,
    optimism: 4,
    polygon: 5,
    scroll: 6,
    linea: 7,
    avalanche: 8,
    mantle: 9,
    ronin: 10,
    unichain: 11,
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
