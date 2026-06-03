import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { requireEnv } from 'common/helpers/require-env';
import { NetworkService } from './network.service';
import { MulticallProvider, MulticallWrapper } from 'ethers-multicall-provider';

@Injectable()
export class ProviderFactory {
  private cache = new Map<number, ethers.JsonRpcProvider>();

  constructor(private readonly networkService: NetworkService) {}

  get(identifier: string | number): ethers.JsonRpcProvider {
    const config = this.requireConfig(identifier);

    let provider = this.cache.get(config.chainId);
    if (!provider) {
      const network = ethers.Network.from(config.chainId);
      provider = new ethers.JsonRpcProvider(
        requireEnv(config.urlEnvVar),
        network,
        {
          staticNetwork: network,
          ...(config.batchMaxCount
            ? { batchMaxCount: config.batchMaxCount }
            : {}),
        },
      );
      this.cache.set(config.chainId, provider);
    }

    return provider;
  }

  multicall(
    identifier: string | number,
    maxMulticallDataLength = 400_000,
  ): MulticallProvider {
    return MulticallWrapper.wrap(this.get(identifier), maxMulticallDataLength);
  }

  /** Drop a cached provider after RPC failure so it cannot retry in the background. */
  evict(identifier: string | number): void {
    const config = this.findConfig(identifier);
    if (!config) return;

    this.cache.get(config.chainId)?.destroy();
    this.cache.delete(config.chainId);
  }

  destroyAll(): void {
    for (const provider of this.cache.values()) {
      provider.destroy();
    }
    this.cache.clear();
  }

  private findConfig(identifier: string | number) {
    return typeof identifier === 'string'
      ? this.networkService.byName(identifier)
      : this.networkService.byChainId(identifier);
  }

  private requireConfig(identifier: string | number) {
    const config = this.findConfig(identifier);
    if (!config) {
      throw new Error(`Unsupported network or chainId: ${identifier}`);
    }
    return config;
  }
}
