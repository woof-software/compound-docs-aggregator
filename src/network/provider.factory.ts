import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { NetworkService } from './network.service';

@Injectable()
export class ProviderFactory {
  private cache = new Map<number, ethers.JsonRpcProvider>();

  constructor(private readonly networkService: NetworkService) {}

  get(identifier: string | number): ethers.JsonRpcProvider {
    const config =
      typeof identifier === 'string'
        ? this.networkService.byName(identifier)
        : this.networkService.byChainId(identifier);

    if (!config) {
      throw new Error(`Unsupported network or chainId: ${identifier}`);
    }

    if (!this.cache.has(config.chainId)) {
      const provider = new ethers.JsonRpcProvider(config.url, config.chainId);
      const originalGetConnection = provider._getConnection.bind(provider);
      provider._getConnection = () => {
        const connection = originalGetConnection();
        if (connection && typeof connection === 'object') {
          (connection as any).timeout = 30000; // 30 seconds timeout
        }
        return connection;
      };
      this.cache.set(config.chainId, provider);
    }

    const provider = this.cache.get(config.chainId);
    if (!provider) {
      throw new Error(
        `Failed to create provider for chainId: ${config.chainId}`,
      );
    }
    return provider;
  }
}
