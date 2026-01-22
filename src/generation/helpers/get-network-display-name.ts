import { NetworkConfig } from 'network/network.types';

/**
 * Gets network display name for deployment key
 */
export function getNetworkDisplayName(
  networkName: string,
  networks: NetworkConfig[],
): string {
  const network = networks.find(
    (n) => n.network.toLowerCase() === networkName.toLowerCase(),
  );

  if (network) {
    return network.displayName;
  }

  // Fallback for networks not in config (e.g., mumbai, base-sepolia)
  const fallbackDisplayMap: Record<string, string> = {
    mumbai: 'Polygon Mumbai Testnet',
    'base-sepolia': 'Base Sepolia',
  };

  const displayName = fallbackDisplayMap[networkName.toLowerCase()];
  if (!displayName) {
    throw new Error(
      `Network display name not found for network: ${networkName}`,
    );
  }
  return displayName;
}
