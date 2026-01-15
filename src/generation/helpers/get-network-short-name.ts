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
    ronin: 'Ronin',
    unichain: 'Unichain',
    avalanche: 'Avalanche',
    fuji: 'Fuji',
    linea: 'Linea',
  };

  const shortName = shortMap[networkName.toLowerCase()];
  if (!shortName) {
    throw new Error(`Network short name not found for network: ${networkName}`);
  }
  return shortName;
}
