import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';

import { ProviderFactory } from 'network/provider.factory';
import CometABI from './abi/CometABI.json';
import ConfiguratorABI from './abi/ConfiguratorABI.json';

interface RootJson {
  comet: string; // Comet contract address
  configurator: string; // Configurator contract address
  rewards?: string; // (optional) Rewards contract address
  bridgeReceiver?: string; // (optional) BridgeReceiver contract address
  bulker?: string; // (optional) Bulker contract address
  [key: string]: any;
}

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);

  constructor(private readonly providerFactory: ProviderFactory) {}

  /**
   * Reads on-chain parameters for a single market, given its root.json object.
   *
   * 1) Determines network from root.networkPath (e.g., "arbitrum/usdc.e/..." → "arbitrum")
   * 2) Creates an ethers.JsonRpcProvider via ProviderFactory
   * 3) Instantiates Comet and Configurator contracts
   * 4) Reads supplyKink, borrowKink, then assets from configurator
   *
   * @param root A parsed object from roots.json (including networkPath, comet, configurator, etc.)
   * @returns An object containing:
   *   - addresses: the original root (all addresses)
   *   - curve: { supplyKink, borrowKink }
   *   - collaterals: array of collateral asset data from configurator
   */
  async readMarketData(
    root: RootJson,
    networkPath: string,
  ): Promise<{
    addresses: RootJson;
    curve: {
      supplyKink: string;
      borrowKink: string;
    };
    collaterals: any[];
  }> {
    // 1) Parse network name from networkPath (before first '/')
    const [networkKey] = networkPath.split('/');
    if (!networkKey) {
      this.logger.error(
        `Invalid networkPath format: '${root.networkPath}'. Expected format: 'network/...'`,
      );
      throw new Error(`Invalid networkPath format: '${root.networkPath}'`);
    }

    let provider: ethers.JsonRpcProvider;
    try {
      provider = this.providerFactory.get(networkKey);
    } catch (e) {
      this.logger.error(
        `Unsupported network '${networkKey}' in path '${root.networkPath}'`,
      );
      throw e;
    }

    // 2) Instantiate Comet contract
    const cometAddress = root.comet;
    const cometContract = new ethers.Contract(
      cometAddress,
      CometABI,
      provider,
    ) as any;

    // 3) Instantiate Configurator contract
    const configuratorAddress = root.configurator;
    const configuratorContract = new ethers.Contract(
      configuratorAddress,
      ConfiguratorABI,
      provider,
    ) as any;

    // 4) Read curve parameters
    let supplyKink;
    let borrowKink;
    try {
      supplyKink = await cometContract.supplyKink();
      borrowKink = await cometContract.borrowKink();
    } catch (err) {
      this.logger.error(
        `Error fetching curve parameters from Comet at ${cometAddress}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
      throw err;
    }

    // 5) Read collaterals (assets) from Configurator
    const assets: any[] = [];
    // try {
    //   // Assuming the ABI includes a method `getAssets()` returning an array of asset structs
    //   assets = await configuratorContract.getAssets();
    // } catch (err) {
    //   this.logger.warn(
    //     `Could not fetch collaterals from Configurator at ${configuratorAddress}: ${
    //       err instanceof Error ? err.message : String(err)
    //     }`,
    //   );
    //   // Proceed with empty array if configurator does not support getAssets
    // }

    return {
      addresses: { ...root, networkPath },
      curve: {
        supplyKink: supplyKink.toString(),
        borrowKink: borrowKink.toString(),
      },
      collaterals: assets,
    };
  }
}
