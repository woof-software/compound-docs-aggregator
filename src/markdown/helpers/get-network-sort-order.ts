/**
 * Gets network sort order for consistent ordering
 */
export function getNetworkSortOrder(networkName: string): string {
  const orderMap: Record<string, string> = {
    mainnet: '01',
    sepolia: '02',
    polygon: '03',
    mumbai: '04',
    arbitrum: '05',
    base: '06',
    'base-sepolia': '07',
    optimism: '08',
    scroll: '09',
    mantle: '10',
  };

  return orderMap[networkName.toLowerCase()] || '99' + networkName;
}
