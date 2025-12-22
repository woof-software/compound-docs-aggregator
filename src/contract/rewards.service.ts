import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';

import RewardsABI from './abi/RewardsABI.json';
import LegacyRewardsABI from './abi/LegacyRewardsABI.json';
import { ProviderFactory } from 'network/provider.factory';
import { CompoundVersion } from 'common/types/compound-version';
import { ConfigService } from '@nestjs/config';
import { NetworkConfig } from 'network/network.types';

const MULTICALL3_ABI = [
  'function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) view returns (tuple(bool success, bytes returnData)[] returnData)',
];

const DEFAULT_MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

interface UserRewardCall {
  userAddress: string;
  cometAddress: string;
  rewardsAddress: string;
}

@Injectable()
export class RewardsService {
  private readonly logger = new Logger(RewardsService.name);

  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly config: ConfigService,
  ) {}

  private get networksList() {
    return this.config.getOrThrow<NetworkConfig[]>('networks');
  }

  public formatOwes(owes: Record<string, bigint>): Record<string, number> {
    const calculated = Object.entries(owes).reduce((acc, [key, value]) => {
      acc[key] = Number(ethers.formatUnits(value, 18));

      return acc;
    }, {} as Record<string, number>);
    return this.networksList.reduce((acc, item) => {
      const calc = calculated[item.network];
      if (calc) {
        acc[item.network] = calc;
      } else {
        acc[item.network] = 0;
      }

      return acc;
    }, {} as Record<string, number>);
  }

  public zeroOwes(version: CompoundVersion): Record<string, bigint> {
    return this.networksList.reduce((acc, item) => {
      if (!item.rewardsCalcEnabled) {
        return acc;
      }
      if (version === CompoundVersion.V3) {
        if (!item.configuratorV3) return acc;
      } else {
        if (!item.comptrollerV2) return acc;
      }

      if (!acc[item.network]) {
        acc[item.network] = 0n;
      }

      return acc;
    }, {} as Record<string, bigint>);
  }

  private decodeOwedModern(returnData: string): bigint | null {
    const iface = new ethers.Interface(RewardsABI);

    try {
      const decoded: any = iface.decodeFunctionResult(
        'getRewardOwed',
        returnData,
      );

      // Common shapes:
      // - [token, owed]
      // - [ { token, owed } ] (tuple wrapped)
      if (Array.isArray(decoded) && decoded.length === 2) {
        return BigInt(decoded[1]);
      }

      if (Array.isArray(decoded) && decoded.length === 1) {
        const r = decoded[0];
        if (r && typeof r === 'object') {
          if (r.owed != null) return BigInt(r.owed);
          if (Array.isArray(r) && r.length >= 2) return BigInt(r[1]);
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  private decodeOwedLegacy(returnData: string): bigint | null {
    const iface = new ethers.Interface(LegacyRewardsABI);

    try {
      const decoded: any = iface.decodeFunctionResult(
        'getRewardOwed',
        returnData,
      );

      // Legacy variants vary by ABI; handle common shapes.
      if (typeof decoded === 'bigint') return decoded;

      if (Array.isArray(decoded)) {
        if (decoded.length === 0) return 0n;
        if (decoded.length === 1) return BigInt(decoded[0]);
        // Some ABIs might still be [token, owed]
        return BigInt(decoded[1]);
      }

      if (decoded && typeof decoded === 'object') {
        if (decoded.owed != null) return BigInt(decoded.owed);
      }

      return null;
    } catch {
      return null;
    }
  }

  private getMulticall3Address(network: string): string {
    return DEFAULT_MULTICALL3_ADDRESS;
  }

  /**
   * Fetch owed rewards for a list of (rewardsAddress, cometAddress, userAddress).
   * Uses Multicall3.aggregate3 to tolerate per-call failures.
   */
  public async sumOwedForUsersV3(params: {
    network: string;
    users: UserRewardCall[];
    chunkSize?: number;
    maxLoggedFailuresPerChunk?: number;
  }): Promise<bigint> {
    const {
      network,
      users,
      chunkSize = 400,
      maxLoggedFailuresPerChunk = 5,
    } = params;

    if (!users.length) return 0n;

    // IMPORTANT: use a plain provider (not your multicall runner).
    const provider = this.providerFactory.get(network);

    const multicall3Address = this.getMulticall3Address(network);
    const multicall3 = new ethers.Contract(
      multicall3Address,
      MULTICALL3_ABI,
      provider,
    );

    const rewardsIface = new ethers.Interface(RewardsABI);

    let sum = 0n;

    for (let i = 0; i < users.length; i += chunkSize) {
      const chunk = users.slice(i, i + chunkSize);

      const calls = chunk.map((d) => ({
        target: d.rewardsAddress,
        allowFailure: true,
        callData: rewardsIface.encodeFunctionData('getRewardOwed', [
          d.cometAddress,
          d.userAddress,
        ]),
      }));

      let results: Array<{ success: boolean; returnData: string }>;
      try {
        results = await multicall3.aggregate3!.staticCall(calls);
      } catch (err) {
        // If Multicall3 isn't deployed on this network/address, you'll land here.
        this.logger.error(
          `[V3][owes][${network}] Multicall3.aggregate3 failed (check multicall3 address / RPC)`,
          err as any,
        );
        // Fail this chunk gracefully
        continue;
      }

      let logged = 0;

      for (let j = 0; j < results.length; j++) {
        const r: any = results[j];
        const meta = chunk[j];

        const success = Boolean(r?.success);
        const returnData = (r?.returnData as string) ?? '0x';

        if (!success || returnData === '0x') {
          if (logged < maxLoggedFailuresPerChunk) {
            logged++;
            this.logger.warn(
              `[V3][owes][${network}] getRewardOwed failed: rewards=${meta?.rewardsAddress} comet=${meta?.cometAddress} user=${meta?.userAddress}`,
            );
          }
          continue;
        }

        // Try modern decode first, then legacy.
        const modern = this.decodeOwedModern(returnData);
        if (modern != null) {
          sum += modern;
          continue;
        }

        const legacy = this.decodeOwedLegacy(returnData);
        if (legacy != null) {
          sum += legacy;
          continue;
        }

        if (logged < maxLoggedFailuresPerChunk) {
          logged++;
          this.logger.warn(
            `[V3][owes][${network}] decode failed: rewards=${
              meta?.rewardsAddress
            } comet=${meta?.cometAddress} user=${
              meta?.userAddress
            } dataPrefix=${returnData.slice(0, 18)}`,
          );
        }
      }
    }

    return sum;
  }
}
