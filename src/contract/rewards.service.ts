import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';

import RewardsABI from './abi/RewardsABI.json';
import LegacyRewardsABI from './abi/LegacyRewardsABI.json';
import ERC20ABI from './abi/ERC20ABI.json';
import { ProviderFactory } from 'network/provider.factory';
import { CompoundVersion } from 'common/types/compound-version';
import { withRetries } from 'common/helpers/with-retries';
import { ConfigService } from '@nestjs/config';
import { NetworkConfig } from 'network/network.types';
import { V2RewardsAtContract } from './rewards.types';
import { OwedRow } from '../indexer/indexer.types';

const MULTICALL3_ABI = [
  'function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) view returns (tuple(bool success, bytes returnData)[] returnData)',
];

// === V2 Comptroller (Compound v2 COMP rewards) ===
const COMPTROLLER_V2_ABI = [
  // public mapping getter
  'function compAccrued(address) view returns (uint256)',
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

  // Retry knobs
  private readonly rpcRetryAttempts = 3;
  private readonly rpcRetryBaseDelayMs = 250;

  private async rpc<T>(label: string, fn: () => Promise<T>): Promise<T> {
    return withRetries(fn, {
      attempts: this.rpcRetryAttempts,
      baseDelayMs: this.rpcRetryBaseDelayMs,
      onRetry: (attempt, err, delayMs) => {
        const msg = String(err?.shortMessage ?? err?.message ?? err);
        this.logger.verbose(
          `[rpc][retry ${attempt}/${this.rpcRetryAttempts}] ${label} -> ${msg} (sleep ${delayMs}ms)`,
        );
      },
    });
  }

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
      }

      return acc;
    }, {} as Record<string, number>);
  }

  public zeroOwes(version: CompoundVersion): Record<string, bigint> {
    return this.networksList.reduce((acc, item) => {
      /*if (!item.rewardsCalcEnabled) {
        return acc;
      }*/
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

  /**
   * V2: Fetch COMP owed for a list of users using Comptroller.compAccrued(user).
   * Uses Multicall3.aggregate3 to tolerate per-call failures.
   */
  public async sumOwedForUsersV2(params: {
    network: string;
    comptroller: string;
    users: Array<string | { userAddress: string }>;
    chunkSize?: number;
    maxLoggedFailuresPerChunk?: number;
  }): Promise<bigint> {
    const {
      network,
      comptroller,
      users,
      chunkSize = 1000,
      maxLoggedFailuresPerChunk = 5,
    } = params;

    if (!users.length) return 0n;

    const provider = this.providerFactory.get(network);

    const multicall3 = new ethers.Contract(
      DEFAULT_MULTICALL3_ADDRESS,
      MULTICALL3_ABI,
      provider,
    );

    const comptrollerIface = new ethers.Interface(COMPTROLLER_V2_ABI);

    const normUsers = users.map((u) =>
      typeof u === 'string' ? u : u.userAddress,
    );

    let sum = 0n;

    for (let i = 0; i < normUsers.length; i += chunkSize) {
      const chunk = normUsers.slice(i, i + chunkSize);

      const calls = chunk.map((userAddress) => ({
        target: comptroller,
        allowFailure: true,
        callData: comptrollerIface.encodeFunctionData('compAccrued', [
          userAddress,
        ]),
      }));

      let results: Array<{ success: boolean; returnData: string }> | null =
        null;

      try {
        results = await this.rpc(
          `[V2][owes][${network}] Multicall3.aggregate3 chunk=${i}-${
            i + chunk.length - 1
          }`,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          () => multicall3.aggregate3!.staticCall(calls),
        );
      } catch (err) {
        this.logger.error(
          `[V2][owes][${network}] Multicall3.aggregate3 failed after retries chunk=${i}-${
            i + chunk.length - 1
          }`,
          err as any,
        );
        continue;
      }

      if (!results) continue;

      let logged = 0;

      for (let j = 0; j < results.length; j++) {
        const r: any = results[j];
        const userAddress = chunk[j];

        const success = Boolean(r?.success);
        const returnData = (r?.returnData as string) ?? '0x';

        if (!success || returnData === '0x') {
          if (logged < maxLoggedFailuresPerChunk) {
            logged++;
            this.logger.warn(
              `[V2][owes][${network}] compAccrued failed: comptroller=${comptroller} user=${userAddress}`,
            );
          }
          continue;
        }

        try {
          const decoded: any = comptrollerIface.decodeFunctionResult(
            'compAccrued',
            returnData,
          );

          // Usually shape: [uint256]
          const owed = Array.isArray(decoded)
            ? BigInt(decoded[0])
            : BigInt(decoded);
          sum += owed;
        } catch {
          if (logged < maxLoggedFailuresPerChunk) {
            logged++;
            this.logger.warn(
              `[V2][owes][${network}] decode failed: comptroller=${comptroller} user=${userAddress} dataPrefix=${returnData.slice(
                0,
                18,
              )}`,
            );
          }
        }
      }
    }

    return sum;
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

    const multicall3 = new ethers.Contract(
      DEFAULT_MULTICALL3_ADDRESS,
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

      let results: Array<{ success: boolean; returnData: string }> | null =
        null;

      try {
        results = await this.rpc(
          `[V3][owes][${network}] Multicall3.aggregate3 chunk=${i}-${
            i + chunk.length - 1
          }`,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          () => multicall3.aggregate3!.staticCall(calls),
        );
      } catch (err) {
        this.logger.error(
          `[V3][owes][${network}] Multicall3.aggregate3 failed after retries chunk=${i}-${
            i + chunk.length - 1
          }`,
          err as any,
        );
        continue; // fail chunk gracefully as before
      }

      let logged = 0;

      if (!results) continue;
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

  /**
   * Reads V2 "Rewards at contract" = rewardToken.balanceOf(comptroller),
   * plus token meta (symbol/decimals).
   */
  public async getRewardsAtContractV2(params: {
    network: string;
    comptroller: string;
    comp: string;
  }): Promise<V2RewardsAtContract> {
    const { network, comptroller, comp } = params;

    const provider = this.providerFactory.multicall(network);

    const token = new ethers.Contract(comp, ERC20ABI, provider);

    // Run in parallel so MulticallProvider can batch efficiently.
    const [decimals, balance] = await Promise.all([
      this.rpc(`[ERC20][${network}] decimals`, async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const d = await token.decimals!.staticCall();
        const n = Number(d);
        return Number.isFinite(n) ? n : 18;
      }),
      this.rpc(`[ERC20][${network}] balanceOf(comptroller)`, async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const b = await token.balanceOf!.staticCall(comptroller);
        return BigInt(b);
      }),
    ]);

    const atContractRaw = balance;
    const atContract = Number(ethers.formatUnits(atContractRaw, decimals));

    return {
      network,
      comptroller,
      tokenDecimals: decimals,
      atContractRaw,
      atContract,
    };
  }

  public async getHealedRewardsV2(params: {
    network: string;
    doctorContract: string;
    comp: string;
  }): Promise<bigint> {
    const { network, doctorContract, comp } = params;

    const provider = this.providerFactory.get(network);

    const token = new ethers.Contract(comp, ERC20ABI, provider);

    return this.rpc(
      `[ERC20][${network}] balanceOf(doctorContract)`,
      async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const b = await token.balanceOf!.staticCall(doctorContract);
        return BigInt(b);
      },
    );
  }

  public async owedForUsers(
    params:
      | {
          version: CompoundVersion.V2;
          network: string;
          market: string; // comptroller
          users: Array<string | { userAddress: string }>;
          chunkSize?: number;
          maxLoggedFailuresPerChunk?: number;
          includeZero?: boolean;
        }
      | {
          version: CompoundVersion.V3;
          network: string;
          users: UserRewardCall[];
          chunkSize?: number;
          maxLoggedFailuresPerChunk?: number;
          includeZero?: boolean;
        },
  ): Promise<OwedRow[]> {
    const includeZero = params.includeZero ?? false;
    const maxLoggedFailuresPerChunk = params.maxLoggedFailuresPerChunk ?? 5;

    if (params.version === CompoundVersion.V2) {
      const { network, market: comptroller } = params;
      const chunkSize = params.chunkSize ?? 1000;

      if (!params.users.length) return [];

      const provider = this.providerFactory.get(network);
      const multicall3 = new ethers.Contract(
        DEFAULT_MULTICALL3_ADDRESS,
        MULTICALL3_ABI,
        provider,
      );

      const comptrollerIface = new ethers.Interface(COMPTROLLER_V2_ABI);
      const normUsers = params.users.map((u) =>
        typeof u === 'string' ? u : u.userAddress,
      );

      const out: OwedRow[] = [];

      for (let i = 0; i < normUsers.length; i += chunkSize) {
        const chunk = normUsers.slice(i, i + chunkSize);

        const calls = chunk.map((userAddress) => ({
          target: comptroller,
          allowFailure: true,
          callData: comptrollerIface.encodeFunctionData('compAccrued', [
            userAddress,
          ]),
        }));

        let results: Array<{ success: boolean; returnData: string }> | null =
          null;

        try {
          results = await this.rpc(
            `[V2][owes][${network}] Multicall3.aggregate3 chunk=${i}-${
              i + chunk.length - 1
            }`,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            () => multicall3.aggregate3!.staticCall(calls),
          );
        } catch (err) {
          this.logger.error(
            `[V2][owes][${network}] Multicall3.aggregate3 failed after retries chunk=${i}-${
              i + chunk.length - 1
            }`,
            err as any,
          );
          continue;
        }

        if (!results) continue;

        let logged = 0;

        for (let j = 0; j < results.length; j++) {
          const r: any = results[j];
          const userAddress = chunk[j];
          if (!userAddress) continue;

          const success = Boolean(r?.success);
          const returnData = (r?.returnData as string) ?? '0x';

          if (!success || returnData === '0x') {
            if (logged < maxLoggedFailuresPerChunk) {
              logged++;
              this.logger.warn(
                `[V2][owes][${network}] compAccrued failed: comptroller=${comptroller} user=${userAddress}`,
              );
            }
            continue;
          }

          try {
            const decoded: any = comptrollerIface.decodeFunctionResult(
              'compAccrued',
              returnData,
            );
            const owed = Array.isArray(decoded)
              ? BigInt(decoded[0])
              : BigInt(decoded);

            if (owed !== 0n || includeZero) {
              out.push({ marketAddress: comptroller, userAddress, owed });
            }
          } catch {
            if (logged < maxLoggedFailuresPerChunk) {
              logged++;
              this.logger.warn(
                `[V2][owes][${network}] decode failed: comptroller=${comptroller} user=${userAddress} dataPrefix=${returnData.slice(
                  0,
                  18,
                )}`,
              );
            }
          }
        }
      }

      return out;
    }

    // V3
    const { network, users } = params;
    const chunkSize = params.chunkSize ?? 400;

    if (!users.length) return [];

    const provider = this.providerFactory.get(network);
    const multicall3 = new ethers.Contract(
      DEFAULT_MULTICALL3_ADDRESS,
      MULTICALL3_ABI,
      provider,
    );

    const rewardsIface = new ethers.Interface(RewardsABI);
    const out: OwedRow[] = [];

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

      let results: Array<{ success: boolean; returnData: string }> | null =
        null;

      try {
        results = await this.rpc(
          `[V3][owes][${network}] Multicall3.aggregate3 chunk=${i}-${
            i + chunk.length - 1
          }`,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          () => multicall3.aggregate3!.staticCall(calls),
        );
      } catch (err) {
        this.logger.error(
          `[V3][owes][${network}] Multicall3.aggregate3 failed after retries chunk=${i}-${
            i + chunk.length - 1
          }`,
          err as any,
        );
        continue;
      }

      if (!results) continue;

      let logged = 0;

      for (let j = 0; j < results.length; j++) {
        const r: any = results[j];
        const meta = chunk[j];
        if (!meta) continue;

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

        const owed =
          this.decodeOwedModern(returnData) ??
          this.decodeOwedLegacy(returnData);
        if (owed == null) {
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
          continue;
        }

        if (owed !== 0n || includeZero) {
          out.push({
            marketAddress: meta.cometAddress,
            userAddress: meta.userAddress,
            owed,
          });
        }
      }
    }

    return out;
  }
}
