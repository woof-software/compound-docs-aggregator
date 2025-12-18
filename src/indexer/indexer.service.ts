import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JsonRpcProvider, getAddress, ethers } from 'ethers';
import { ProviderFactory } from 'network/provider.factory';
import { NetworkConfig } from 'network/network.types';
import { CompoundVersion } from 'common/types/compound-version';
import { createSqliteApi } from './sqlite-api';
import {
  ADDR_TOPIC_INDEXES,
  DEFAULT_COMET_TOPIC0_OR,
  DISCOVERY_TOPIC0_OR,
} from './topics';
import { IndexerUsers } from './indexer.types';

type SqliteApi = ReturnType<typeof createSqliteApi>;

const normAddr = (a: string) => getAddress(a).toLowerCase();
const topicToAddress = (topic: string) => normAddr('0x' + topic.slice(-40));

@Injectable()
export class IndexerService {
  private readonly logger = new Logger(IndexerService.name);

  private readonly sqlite: SqliteApi;
  private readonly maxParallelNetworks = 3;
  // Keep it simple: fixed chunk size in code (no env).
  private readonly blockStep = 5_000;

  private readonly rewardsV3ByNetwork: Map<string, string | null>;

  private static readonly NETWORK_CURSOR_ADDR = '__network__';
  private static readonly CURSOR_KIND_V3 = 'v3';

  constructor(
    private readonly config: ConfigService,
    private readonly providerFactory: ProviderFactory,
  ) {
    this.sqlite = createSqliteApi('./db.sqlite');
    this.rewardsV3ByNetwork = new Map(
      this.networks.map((n) => [
        n.network,
        n.rewardsV3 ? normAddr(n.rewardsV3) : null,
      ]),
    );
  }

  private get networks(): NetworkConfig[] {
    return this.config.get<NetworkConfig[]>('networks') ?? [];
  }

  private async runWithConcurrency<T>(
    items: T[],
    concurrency: number,
    fn: (item: T) => Promise<void>,
  ): Promise<void> {
    if (items.length === 0) return;

    const limit = Math.max(1, Math.min(concurrency, items.length));
    let idx = 0;

    const workers = Array.from({ length: limit }, async () => {
      while (true) {
        const current = idx++;
        if (current >= items.length) return;
        await fn(items[current]!);
      }
    });

    await Promise.all(workers);
  }

  public async runV3(): Promise<void> {
    const targets = this.networks.filter((n) => {
      if (!n.configuratorV3) {
        this.logger.warn(`Skipping V3 (no configuratorV3): ${n.network}`);
        return false;
      }
      return true;
    });

    await this.runWithConcurrency(
      targets,
      this.maxParallelNetworks,
      async (n) => {
        try {
          await this.indexNetworkV3(n);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          const trace = err instanceof Error ? err.stack : undefined;

          this.logger.error(
            `V3 indexing failed, skipping network=${n.network} chainId=${n.chainId}: ${msg}`,
            trace,
          );
        }
      },
    );

    this.logger.log(`V3 indexing finished. networks=${targets.length}`);
  }

  public async fetchUsers(
    version: CompoundVersion,
    networkLimit: number,
    networkOffset: number,
  ): Promise<IndexerUsers> {
    if (version !== CompoundVersion.V3) {
      throw new Error(`fetchUsers: unsupported version ${String(version)}`);
    }

    const out: IndexerUsers = {};

    // Use configured networks (so pagination is "per network")
    const targets = this.networks.filter((n) => n.configuratorV3);

    for (const n of targets) {
      const network = n.network;

      const rows = this.sqlite.fetchUsersPageByNetwork.all(
        network,
        networkLimit,
        networkOffset,
      ) as Array<{ comet: string; user: string }>;

      if (rows.length === 0) continue;

      const rewardsAddress = this.rewardsV3ByNetwork.get(network);

      if (!rewardsAddress) {
        throw Error(`RewardsV3 for ${network} not found!`);
      }

      out[network] = rows.map((r) => ({
        rewardsAddress,
        cometAddress: r.comet,
        userAddress: r.user,
      }));
    }

    return out;
  }

  public async fetchUsersForNetwork(
    version: CompoundVersion,
    network: string,
    limit: number,
    offset: number,
  ): Promise<IndexerUsers[string]> {
    if (version !== CompoundVersion.V3) {
      throw new Error(
        `fetchUsersForNetwork: unsupported version ${String(version)}`,
      );
    }

    const rows = this.sqlite.fetchUsersPageByNetwork.all(
      network,
      limit,
      offset,
    ) as Array<{
      comet: string;
      user: string;
    }>;

    const rewardsAddress = this.rewardsV3ByNetwork.get(network) ?? null;

    if (!rewardsAddress) {
      throw Error(`RewardsV3 for ${network} not found!`);
    }

    return rows.map((r) => ({
      rewardsAddress,
      cometAddress: r.comet,
      userAddress: r.user,
    }));
  }

  private async indexNetworkV3(n: NetworkConfig): Promise<void> {
    const provider = this.providerFactory.get(n.network);
    const head = await provider.getBlockNumber();
    const finalizedTo = Math.max(0, head - (n.reorgWindow ?? 64));

    this.logger.log(
      `Indexing V3: network=${n.network} head=${head} finalizedTo=${finalizedTo}`,
    );

    await this.discoverCometsV3({
      network: n.network,
      provider,
      configurator: normAddr(n.configuratorV3!),
      fromBlock: n.startBlock ?? 0,
      toBlock: finalizedTo,
    });

    const comets = this.sqlite.listComets.all(n.network) as Array<{
      comet: string;
      first_seen_block: number;
    }>;

    this.logger.log(
      `Discovered V3 comets: network=${n.network} count=${comets.length}`,
    );

    for (const { comet, first_seen_block } of comets) {
      await this.indexCometUsersV3({
        network: n.network,
        provider,
        comet: normAddr(comet),
        fromBlock: first_seen_block,
        toBlock: finalizedTo,
      });
    }
  }

  private async discoverCometsV3(args: {
    network: string;
    provider: JsonRpcProvider;
    configurator: string;
    fromBlock: number;
    toBlock: number;
  }): Promise<void> {
    const { network, provider, configurator, fromBlock, toBlock } = args;

    const cursorRow = this.sqlite.getCursor.get(
      network,
      'configuratorV3',
      configurator,
    ) as { last_block: number } | undefined;

    const start = cursorRow ? cursorRow.last_block + 1 : fromBlock;
    if (start > toBlock) return;

    const tsCache = new Map<number, number>();

    await this.scanLogs({
      provider,
      address: configurator,
      fromBlock: start,
      toBlock,
      topic0Or: DISCOVERY_TOPIC0_OR,
      onLogs: async (logs) => {
        let firstBn = 0;
        let lastBn = 0;

        for (const log of logs) {
          const cometProxy = topicToAddress(log.topics[1]);
          const bn = Number(log.blockNumber);
          const ts = await this.getBlockTs(provider, tsCache, bn);

          if (!firstBn) firstBn = bn;
          lastBn = Math.max(lastBn, bn);

          this.sqlite.upsertComet.run(network, cometProxy, bn, ts);
        }

        this.logger.verbose(
          `[${firstBn}-${lastBn}] Found comets logs (${logs.length}) - ${network}...`,
        );
      },
      onChunkScanned: async (scannedTo) => {
        this.sqlite.setCursor.run(
          network,
          'configuratorV3',
          configurator,
          scannedTo, // ✅ store progress per chunk
          Math.floor(Date.now() / 1000),
        );
      },
    });

    this.sqlite.setCursor.run(
      network,
      'configuratorV3',
      configurator,
      toBlock,
      Math.floor(Date.now() / 1000),
    );

    this.logger.log(
      `Configurator synced: network=${network} toBlock=${toBlock}`,
    );
  }

  private async indexCometUsersV3(args: {
    network: string;
    provider: JsonRpcProvider;
    comet: string;
    fromBlock: number;
    toBlock: number;
  }): Promise<void> {
    const { network, provider, comet, fromBlock, toBlock } = args;

    const cursorRow = this.sqlite.getCursor.get(network, 'cometV3', comet) as
      | { last_block: number }
      | undefined;

    const start = cursorRow ? cursorRow.last_block + 1 : fromBlock;
    if (start > toBlock) return;

    const tsCache = new Map<number, number>();
    const topics0 = [...DEFAULT_COMET_TOPIC0_OR];

    await this.scanLogs({
      provider,
      address: comet,
      fromBlock: start,
      toBlock,
      topic0Or: topics0,
      onLogs: async (logs) => {
        const uniqBlocks = new Set<number>();
        for (const l of logs) uniqBlocks.add(Number(l.blockNumber));
        for (const bn of uniqBlocks)
          await this.getBlockTs(provider, tsCache, bn);

        const rows: Array<[string, string, string, number]> = [];

        let firstBn = 0;
        let lastBn = 0;

        for (const log of logs) {
          const topic0 = log.topics[0] as string;
          const idxs = ADDR_TOPIC_INDEXES[topic0];
          if (!idxs) continue;

          const bn = Number(log.blockNumber);
          const createdAt = tsCache.get(bn)!;

          if (!firstBn) firstBn = bn;
          lastBn = Math.max(lastBn, bn);

          for (const i of idxs) {
            const user = topicToAddress(log.topics[i]);
            if (user === ethers.ZeroAddress) continue;
            rows.push([network, comet, user, createdAt]);
          }
        }

        if (rows.length) this.sqlite.txUpsertUsers(rows);

        this.logger.verbose(
          `[${firstBn}-${lastBn}] Found users logs (${logs.length}) - ${network}...`,
        );
      },
      onChunkScanned: async (scannedTo) => {
        this.sqlite.setCursor.run(
          network,
          'cometV3',
          comet,
          scannedTo, // ✅ store progress per chunk
          Math.floor(Date.now() / 1000),
        );
      },
    });

    this.sqlite.setCursor.run(
      network,
      'cometV3',
      comet,
      toBlock,
      Math.floor(Date.now() / 1000),
    );

    this.logger.log(
      `Comet users synced: network=${network} comet=${comet} toBlock=${toBlock}`,
    );
  }

  private async scanLogs(args: {
    provider: JsonRpcProvider;
    address: string;
    fromBlock: number;
    toBlock: number;
    topic0Or: string[];
    onLogs: (logs: any[]) => Promise<void>;
    onChunkScanned?: (scannedToBlock: number) => Promise<void> | void; // ✅ add
  }): Promise<void> {
    const {
      provider,
      address,
      fromBlock,
      toBlock,
      topic0Or,
      onLogs,
      onChunkScanned,
    } = args;

    let from = fromBlock;
    while (from <= toBlock) {
      const to = Math.min(toBlock, from + this.blockStep - 1);

      const logs = await this.getLogsAdaptive(provider, {
        address,
        fromBlock: from,
        toBlock: to,
        topics: [topic0Or],
      });

      if (logs.length) await onLogs(logs);

      // ✅ Even if logs.length === 0, we still advanced the scan window.
      if (onChunkScanned) await onChunkScanned(to);

      from = to + 1;
    }
  }

  private async getLogsAdaptive(
    provider: JsonRpcProvider,
    req: { address: string; fromBlock: number; toBlock: number; topics: any[] },
  ): Promise<any[]> {
    const out: any[] = [];
    const stack: Array<[number, number]> = [[req.fromBlock, req.toBlock]];

    while (stack.length) {
      const [a, b] = stack.pop()!;
      try {
        const logs = await provider.getLogs({
          address: req.address,
          fromBlock: a,
          toBlock: b,
          topics: req.topics,
        });
        out.push(...logs);
      } catch (e) {
        if (a >= b) throw e;
        const mid = Math.floor((a + b) / 2);
        stack.push([a, mid], [mid + 1, b]);
      }
    }

    return out;
  }

  private async getBlockTs(
    provider: JsonRpcProvider,
    cache: Map<number, number>,
    blockNumber: number,
  ): Promise<number> {
    const cached = cache.get(blockNumber);
    if (cached != null) return cached;

    const b = await provider.getBlock(blockNumber);
    if (!b) throw new Error(`Block not found: ${blockNumber}`);

    const ts = Number(b.timestamp);
    cache.set(blockNumber, ts);
    return ts;
  }
}
