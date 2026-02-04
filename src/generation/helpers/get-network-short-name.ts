import { NetworkConfig } from 'network/network.types';

/**
 * Gets short network name for tab text
 * Uses network name with first letter capitalized, handling hyphens
 */
export function getNetworkShortName(
  networkName: string,
  networks: NetworkConfig[],
): string {
  const capitalizeNetworkName = (name: string): string =>
    name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const network = networks.find(
    (n) => n.network.toLowerCase() === networkName.toLowerCase(),
  );

  if (network) {
    return capitalizeNetworkName(network.network);
  }

  // Fallback for networks not in config (e.g., mumbai, base-sepolia)
  return capitalizeNetworkName(networkName);
}
