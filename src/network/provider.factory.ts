import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { NetworkService } from './network.service';
import { MulticallProvider, MulticallWrapper } from 'ethers-multicall-provider';

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
      const provider = new ethers.JsonRpcProvider(
        config.url,
        config.chainId,
        config.batchMaxCount ? { batchMaxCount: config.batchMaxCount } : {},
      );
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

  multicall(
    identifier: string | number,
    maxMulticallDataLength = 400_000,
  ): MulticallProvider {
    return MulticallWrapper.wrap(this.get(identifier), maxMulticallDataLength);
  }
}
