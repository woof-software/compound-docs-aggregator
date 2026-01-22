import { NetworkConfig } from 'network/network.types';

/**
 * Gets blockscan origin URL for a network
 */
export function getBlockscanOrigin(
  networkName: string,
  networks: NetworkConfig[],
): string {
  const network = networks.find(
    (n) => n.network.toLowerCase() === networkName.toLowerCase(),
  );

  if (network) {
    return network.blockscanOrigin;
  }

  // Fallback for networks not in config (e.g., mumbai, base-sepolia)
  const fallbackBlockscanMap: Record<string, string> = {
    mumbai: 'https://mumbai.polygonscan.com/',
    'base-sepolia': 'https://sepolia.basescan.org/',
  };

  const origin = fallbackBlockscanMap[networkName.toLowerCase()];
  if (!origin) {
    throw new Error(`Blockscan origin not found for network: ${networkName}`);
  }
  return origin;
}
