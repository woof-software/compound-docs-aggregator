import { NetworkConfig } from 'network/network.types';

/**
 * Gets network sort position for consistent ordering
 * Position matches compound.finance/markets page
 */
export function getNetworkSortPosition(
  networkName: string,
  networks: NetworkConfig[],
): number {
  const network = networks.find(
    (n) => n.network.toLowerCase() === networkName.toLowerCase(),
  );

  if (network) {
    return network.sortPosition;
  }

  // Fallback for networks not in config (e.g., mumbai, base-sepolia)
  const fallbackPositionMap: Record<string, number> = {
    mumbai: 13,
    'base-sepolia': 14,
  };

  const sortPosition = fallbackPositionMap[networkName.toLowerCase()];
  if (sortPosition === undefined) {
    throw new Error(
      `Network sort position not found for network: ${networkName}`,
    );
  }
  return sortPosition;
}
