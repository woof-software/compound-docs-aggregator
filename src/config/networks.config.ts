import { registerAs } from '@nestjs/config';
import { NetworkConfig } from '../network/network.types';

export default registerAs('networks', (): NetworkConfig[] => [
  {
    network: 'mainnet',
    chainId: 1,
    url: `https://rpc.ankr.com/eth/${process.env.ANKR_KEY}`,
  },
  {
    network: 'sepolia',
    chainId: 11155111,
    url: `https://rpc.ankr.com/eth_sepolia/${process.env.ANKR_KEY}`,
  },
  {
    network: 'ronin',
    chainId: 2020,
    url: 'https://ronin.drpc.org',
    // url: 'https://ronin.lgns.net/rpc',
  },
  {
    network: 'polygon',
    chainId: 137,
    url: `https://rpc.ankr.com/polygon/${process.env.ANKR_KEY}`,
  },
  {
    network: 'optimism',
    chainId: 10,
    url: `https://rpc.ankr.com/optimism/${process.env.ANKR_KEY}`,
  },
  {
    network: 'mantle',
    chainId: 5000,
    url: `https://rpc.ankr.com/mantle/${process.env.ANKR_KEY}`,
  },
  {
    network: 'unichain',
    chainId: 130,
    url: `https://unichain.drpc.org`,
    // url: `https://solemn-smart-violet.unichain-mainnet.quiknode.pro/${process.env.UNICHAIN_QUICKNODE_KEY}`,
    // url: `https://multi-boldest-patina.unichain-mainnet.quiknode.pro/${process.env.UNICHAIN_QUICKNODE_KEY}`,
  },
  {
    network: 'base',
    chainId: 8453,
    url: `https://rpc.ankr.com/base/${process.env.ANKR_KEY}`,
  },
  {
    network: 'arbitrum',
    chainId: 42161,
    url: `https://rpc.ankr.com/arbitrum/${process.env.ANKR_KEY}`,
  },
  {
    network: 'avalanche',
    chainId: 43114,
    url: 'https://api.avax.network/ext/bc/C/rpc',
  },
  {
    network: 'fuji',
    chainId: 43113,
    url: 'https://api.avax-test.network/ext/bc/C/rpc',
  },
  {
    network: 'scroll',
    chainId: 534352,
    url: `https://rpc.ankr.com/scroll/${process.env.ANKR_KEY}`,
  },
  {
    network: 'linea',
    chainId: 59144,
    url: `https://rpc.ankr.com/linea/${process.env.ANKR_KEY}`,
  },
]);
