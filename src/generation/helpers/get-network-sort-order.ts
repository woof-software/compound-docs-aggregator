import { NetworkConfig } from 'network/network.types';

/**
 * Gets network sort order for consistent ordering
 * Order matches compound.finance/markets page
 */
export function getNetworkSortOrder(
  networkName: string,
  networks: NetworkConfig[],
): number {
  const network = networks.find(
    (n) => n.network.toLowerCase() === networkName.toLowerCase(),
  );

  if (network) {
    return network.sortOrder;
  }

  // Fallback for networks not in config (e.g., mumbai, base-sepolia)
  const fallbackOrderMap: Record<string, number> = {
    mumbai: 13,
    'base-sepolia': 14,
  };

  const sortOrder = fallbackOrderMap[networkName.toLowerCase()];
  if (sortOrder === undefined) {
    throw new Error(`Network sort order not found for network: ${networkName}`);
  }
  return sortOrder;
}
