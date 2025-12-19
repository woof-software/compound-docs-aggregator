import { capitalizeFirst } from './capitalize-first';

/**
 * Gets network display name for deployment key
 */
export function getNetworkDisplayName(networkName: string): string {
  const networkMap: Record<string, string> = {
    mainnet: 'Ethereum Mainnet',
    sepolia: 'Ethereum Sepolia Testnet',
    polygon: 'Polygon Mainnet',
    arbitrum: 'Arbitrum',
    base: 'Base',
    optimism: 'Optimism',
    scroll: 'Scroll',
    mantle: 'Mantle',
    mumbai: 'Polygon Mumbai Testnet',
    'base-sepolia': 'Base Sepolia',
  };

  return networkMap[networkName.toLowerCase()] || capitalizeFirst(networkName);
}
