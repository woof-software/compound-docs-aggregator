import { capitalizeFirst } from './capitalize-first';

/**
 * Gets short network name for tab text
 */
export function getNetworkShortName(networkName: string): string {
  const shortMap: Record<string, string> = {
    mainnet: 'Mainnet',
    sepolia: 'Sepolia',
    polygon: 'Polygon',
    arbitrum: 'Arbitrum',
    base: 'Base',
    optimism: 'Optimism',
    scroll: 'Scroll',
    mantle: 'Mantle',
    mumbai: 'Mumbai',
    'base-sepolia': 'Base Sepolia',
  };

  return shortMap[networkName.toLowerCase()] || capitalizeFirst(networkName);
}
