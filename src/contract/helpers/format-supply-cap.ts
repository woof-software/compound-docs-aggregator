import { ethers } from 'ethers';

export function formatSupplyCap(
  supplyCapRaw: string,
  decimals: number,
): string {
  if (supplyCapRaw === '0') {
    return '0';
  }

  try {
    const supplyCapNum = Number(ethers.formatUnits(supplyCapRaw, decimals));

    if (supplyCapNum >= 1e9) {
      return `${(supplyCapNum / 1e9).toFixed(2)}B`;
    } else if (supplyCapNum >= 1e6) {
      return `${(supplyCapNum / 1e6).toFixed(2)}M`;
    } else if (supplyCapNum >= 1e3) {
      return `${(supplyCapNum / 1e3).toFixed(2)}K`;
    } else {
      return supplyCapNum.toLocaleString('en-US', {
        maximumFractionDigits: 2,
      });
    }
  } catch {
    return supplyCapRaw;
  }
}
