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
    ronin: 'Ronin',
    unichain: 'Unichain',
    avalanche: 'Avalanche',
    fuji: 'Avalanche Fuji Testnet',
    linea: 'Linea',
  };

  const displayName = networkMap[networkName.toLowerCase()];
  if (!displayName) {
    throw new Error(
      `Network display name not found for network: ${networkName}`,
    );
  }
  return displayName;
}
