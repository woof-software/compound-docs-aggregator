/**
 * Gets blockscan origin URL for a network
 */
export function getBlockscanOrigin(networkName: string): string {
  const blockscanMap: Record<string, string> = {
    mainnet: 'https://etherscan.io/',
    sepolia: 'https://sepolia.etherscan.io/',
    polygon: 'https://polygonscan.com/',
    mumbai: 'https://mumbai.polygonscan.com/',
    arbitrum: 'https://arbiscan.io/',
    base: 'https://basescan.org/',
    'base-sepolia': 'https://sepolia.basescan.org/',
    optimism: 'https://optimistic.etherscan.io/',
    scroll: 'https://scrollscan.com/',
    mantle: 'https://mantlescan.xyz/',
    ronin: 'https://app.roninchain.com/',
    unichain: 'https://uniscan.io/',
    avalanche: 'https://snowtrace.io/',
    fuji: 'https://testnet.snowtrace.io/',
    linea: 'https://lineascan.build/',
  };

  const origin = blockscanMap[networkName.toLowerCase()];
  if (!origin) {
    throw new Error(`Blockscan origin not found for network: ${networkName}`);
  }
  return origin;
}
