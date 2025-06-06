import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import networksConfig from '../config/networks.config';
import { NetworkConfig } from './network.types';

@Injectable()
export class NetworkService {
  constructor(
    @Inject(networksConfig.KEY)
    private readonly networks: ConfigType<typeof networksConfig>,
  ) {}

  all(): NetworkConfig[] {
    return this.networks;
  }

  byName(name: string): NetworkConfig | undefined {
    return this.networks.find((n) => n.network === name);
  }

  byChainId(chainId: number): NetworkConfig | undefined {
    return this.networks.find((n) => n.chainId === chainId);
  }
}
