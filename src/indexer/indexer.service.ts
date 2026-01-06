import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JsonRpcProvider, getAddress, ethers } from 'ethers';
import { ProviderFactory } from 'network/provider.factory';
import { NetworkConfig } from 'network/network.types';

import { createSqliteApi } from './sqlite-api';
import {
  AddrSource,
  V2_DISCOVERY_TOPIC0_OR,
  V2_USER_ADDR_SOURCES,
  V2_USER_TOPIC0_OR,
  V3_DISCOVERY_TOPIC0_OR,
  V3_USER_ADDR_SOURCES,
  V3_USER_TOPIC0_OR,
} from './topics';
import { RuntimeDbService } from './runtime-db.service';
import { fmtPct } from '../common/utils/fmt-pct';
import { withRetries } from '../common/helpers/with-retries';

type SqliteApi = ReturnType<typeof createSqliteApi>;

const normAddr = (a: string) => getAddress(a).toLowerCase();
const topicToAddress = (topic: string) => normAddr('0x' + topic.slice(-40));

@Injectable()
export class IndexerService {
  private readonly logger = new Logger(IndexerService.name);

  private _sqlite?: SqliteApi;
  private set sqlite(sqlite: SqliteApi) {
    this._sqlite = sqlite;
  }
  private get sqlite(): SqliteApi {
    if (!this._sqlite) throw new Error('SqliteApi must be defined');
    return this._sqlite;
  }

  // Tuning knobs
  private readonly maxParallelNetworks = 2;
  private readonly blockStep = 1_000;
  private readonly addressBatchSize = 30;
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

  private readonly progressTagByNetwork = new Map<string, string>();

  constructor(
    private readonly config: ConfigService,
    private readonly providerFactory: ProviderFactory,
    private readonly runtimeDb: RuntimeDbService, // explicit dependency for init order
  ) {}

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await fn(items[current]!);
      }
    });

    await Promise.all(workers);
  }

  /**
   * Index all enabled versions (V2+V3) with ONE cursor per network.
   * This MUST be the only indexing entrypoint if you want cursor correctness.
   */
  public async run(): Promise<void> {
    await this.runtimeDb.assemble();
    this.sqlite = this.runtimeDb.api;
    const targets = this.networks.filter((n) => {
      const enabled = Boolean(
        n.indexingEnabled && (n.comptrollerV2 || n.configuratorV3),
      );
      if (!enabled) {
        this.logger.warn(`Skipping (no V2/V3 addresses): ${n.network}`);
      }
      return enabled;
    });

    await this.runWithConcurrency(
      targets,
      this.maxParallelNetworks,
      async (n) => {
        try {
          await this.indexNetwork(n);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          const trace = err instanceof Error ? err.stack : undefined;

          this.logger.error(
            `Indexing failed, skipping network=${n.network} chainId=${n.chainId}: ${msg}`,
            trace,
          );
        }
      },
    );

    await this.runtimeDb.flush();

    this.logger.log(`Indexing finished. networks=${targets.length}`);
  }

  // ============================
  // Core indexing (ONE cursor)
  // ============================

  private async indexNetwork(n: NetworkConfig): Promise<void> {
    const provider = this.providerFactory.get(n.network);
    const head = await this.rpc(`[${n.network}] getBlockNumber`, () =>
      provider.getBlockNumber(),
    );
    const finalizedTo = Math.max(0, head - (n.reorgWindow ?? 64));

    const cursorRow = this.sqlite.getCursor.get(n.network) as
      | { last_block: number }
      | undefined;

    const baselineFrom = Math.max(0, n.startBlock ?? 0);

    const startFrom = cursorRow ? cursorRow.last_block + 1 : baselineFrom;

    // Global progress over [baselineFrom..finalizedTo]
    const totalBlocks = Math.max(0, finalizedTo - baselineFrom + 1);

    const tagFor = (processedToInclusive: number): string => {
      const doneBlocks = Math.max(0, processedToInclusive - baselineFrom + 1);
      const pct = fmtPct(doneBlocks, totalBlocks, 10);
      return `[${n.network} (${pct})]`;
    };

    const setTag = (processedToInclusive: number): string => {
      const tag = tagFor(processedToInclusive);
      this.progressTagByNetwork.set(n.network, tag);
      return tag;
    };

    if (startFrom > finalizedTo) {
      // Already synced to finalizedTo in global terms.
      this.progressTagByNetwork.set(n.network, `[${n.network} (100%)]`);
      this.logger.log(
        `[${n.network} (100%)] Up to date: startFrom=${startFrom} finalizedTo=${finalizedTo}`,
      );
      return;
    }

    // At start we already have cursor up to (startFrom - 1)
    const startTag = setTag(startFrom - 1);

    this.logger.log(
      `${startTag} Indexing: head=${head} finalizedTo=${finalizedTo} startFrom=${startFrom}`,
    );

    // Load known markets (to detect "new market discovered in the middle of chunk")
    const known = new Set<string>();
    const existing = this.sqlite.listMarketsAll.all(n.network) as Array<{
      version: number;
      market: string;
    }>;
    for (const m of existing) known.add(`${m.version}:${m.market}`);

    const tsCache = new Map<number, number>();

    let from = startFrom;
    while (from <= finalizedTo) {
      const plannedTo = Math.min(finalizedTo, from + this.blockStep - 1);

      const minNewMarketBlock = await this.discoverMarketsInRange({
        network: n.network,
        provider,
        fromBlock: from,
        toBlock: plannedTo,
        cfg: n,
        known,
        tsCache,
      });

      const to =
        minNewMarketBlock && minNewMarketBlock > from
          ? minNewMarketBlock - 1
          : plannedTo;

      // Make sure inner logs (found rows) already have the correct [%] for THIS chunk
      const chunkTag = setTag(to);

      await this.indexUsersInRange({
        network: n.network,
        provider,
        fromBlock: from,
        toBlock: to,
        tsCache,
      });

      this.sqlite.setCursor.run(n.network, to, Math.floor(Date.now() / 1000));

      // log on EVERY committed chunk
      this.logger.log(
        `${chunkTag} Cursor committed: processedTo=${to} plannedTo=${plannedTo} nextFrom=${
          to + 1
        }`,
      );

      if (to < plannedTo) {
        this.logger.verbose(
          `${chunkTag} Rewind boundary applied: processedTo=${to} plannedTo=${plannedTo} nextFrom=${
            to + 1
          }`,
        );
      }

      from = to + 1;
    }

    // Force final tag to 100%
    this.progressTagByNetwork.set(n.network, `[${n.network} (100%)]`);

    this.logger.log(
      `[${n.network} (100%)] Network synced: toBlock=${finalizedTo}`,
    );
  }

  private async discoverMarketsInRange(args: {
    network: string;
    provider: JsonRpcProvider;
    fromBlock: number;
    toBlock: number;
    cfg: NetworkConfig;
    known: Set<string>;
    tsCache: Map<number, number>;
  }): Promise<number | null> {
    const { network, provider, fromBlock, toBlock, cfg, known, tsCache } = args;

    let minNewBlock: number | null = null;

    // --- V3: configurator discovery ---
    if (cfg.configuratorV3) {
      const configurator = normAddr(cfg.configuratorV3);

      const logs = await this.getLogsAdaptive(provider, {
        address: configurator,
        fromBlock,
        toBlock,
        topics: [V3_DISCOVERY_TOPIC0_OR],
      });

      for (const log of logs) {
        // For our broad topic set, cometProxy is expected in topics[1]
        if (!log.topics?.[1]) continue;

        const market = topicToAddress(log.topics[1]);
        const bn = Number(log.blockNumber);
        const ts = await this.getBlockTs(provider, tsCache, bn);

        const key = `3:${market}`;
        if (!known.has(key)) {
          known.add(key);
          minNewBlock = minNewBlock == null ? bn : Math.min(minNewBlock, bn);
        }

        this.sqlite.upsertMarket.run(network, 3, market, bn, ts);
      }
    }

    // --- V2: comptroller discovery (MarketListed) ---
    if (cfg.comptrollerV2) {
      const comptroller = normAddr(cfg.comptrollerV2);

      const logs = await this.getLogsAdaptive(provider, {
        address: comptroller,
        fromBlock,
        toBlock,
        topics: [V2_DISCOVERY_TOPIC0_OR],
      });

      for (const log of logs) {
        const bn = Number(log.blockNumber);
        const ts = await this.getBlockTs(provider, tsCache, bn);

        // MarketListed(address) may be indexed or not depending on implementation.
        const market =
          (log.topics?.[1] ? topicToAddress(log.topics[1]) : null) ??
          this.dataWordToAddress(log.data, 0);

        if (!market) continue;

        const key = `2:${market}`;
        if (!known.has(key)) {
          known.add(key);
          minNewBlock = minNewBlock == null ? bn : Math.min(minNewBlock, bn);
        }

        this.sqlite.upsertMarket.run(network, 2, market, bn, ts);
      }
    }

    return minNewBlock;
  }

  private async indexUsersInRange(args: {
    network: string;
    provider: JsonRpcProvider;
    fromBlock: number;
    toBlock: number;
    tsCache: Map<number, number>;
  }): Promise<void> {
    const { network, provider, fromBlock, toBlock, tsCache } = args;

    if (fromBlock > toBlock) return;

    // All markets active up to end of this processed range
    const markets = this.sqlite.listMarketsUpTo.all(network, toBlock) as Array<{
      version: number;
      market: string;
      first_seen_block: number;
    }>;

    const v3Markets = markets
      .filter((m) => m.version === 3)
      .map((m) => m.market);
    const v2Markets = markets
      .filter((m) => m.version === 2)
      .map((m) => m.market);

    await this.indexUsersForMarkets({
      network,
      version: 3,
      provider,
      markets: v3Markets,
      fromBlock,
      toBlock,
      topic0Or: V3_USER_TOPIC0_OR,
      addrSourcesByTopic0: V3_USER_ADDR_SOURCES,
      tsCache,
    });

    await this.indexUsersForMarkets({
      network,
      version: 2,
      provider,
      markets: v2Markets,
      fromBlock,
      toBlock,
      topic0Or: V2_USER_TOPIC0_OR,
      addrSourcesByTopic0: V2_USER_ADDR_SOURCES,
      tsCache,
    });
  }

  private async indexUsersForMarkets(args: {
    network: string;
    version: number; // 2 | 3
    provider: JsonRpcProvider;
    markets: string[];
    fromBlock: number;
    toBlock: number;
    topic0Or: string[];
    addrSourcesByTopic0: Record<string, AddrSource[]>;
    tsCache: Map<number, number>;
  }): Promise<void> {
    const {
      network,
      version,
      provider,
      markets,
      fromBlock,
      toBlock,
      topic0Or,
      addrSourcesByTopic0,
      tsCache,
    } = args;

    if (markets.length === 0) return;

    const batches = this.chunk(markets, this.addressBatchSize);

    for (const batch of batches) {
      const logs = await this.getLogsAdaptive(provider, {
        address: batch,
        fromBlock,
        toBlock,
        topics: [topic0Or],
      });

      if (logs.length === 0) continue;

      // Cache block timestamps for this log batch
      const uniqBlocks = new Set<number>();
      for (const l of logs) uniqBlocks.add(Number(l.blockNumber));
      for (const bn of uniqBlocks) await this.getBlockTs(provider, tsCache, bn);

      const rows: Array<[string, number, string, string, number]> = [];

      for (const log of logs) {
        const topic0 = String(log.topics?.[0] ?? '');
        const sources = addrSourcesByTopic0[topic0];
        if (!sources) continue;

        const market = normAddr(String(log.address));
        const bn = Number(log.blockNumber);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const createdAt = tsCache.get(bn)!;

        for (const s of sources) {
          const user =
            s.kind === 'topic'
              ? log.topics?.[s.index]
                ? topicToAddress(log.topics[s.index])
                : null
              : this.dataWordToAddress(log.data, s.index);

          if (!user || user === ethers.ZeroAddress) continue;
          rows.push([network, version, market, user, createdAt]);
        }
      }

      if (rows.length) {
        this.sqlite.txUpsertUsers(rows);
        const tag = this.progressTagByNetwork.get(network) ?? '?';
        this.logger.verbose(
          `${tag}[${fromBlock}-${toBlock}] -> found ${rows.length} rows`,
        );
      }
    }
  }

  // ============================
  // RPC helpers
  // ============================

  private async getLogsAdaptive(
    provider: JsonRpcProvider,
    req: {
      address: string | string[];
      fromBlock: number;
      toBlock: number;
      topics: any[];
    },
  ): Promise<any[]> {
    const out: any[] = [];
    const stack: Array<[number, number]> = [[req.fromBlock, req.toBlock]];

    while (stack.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [a, b] = stack.pop()!;
      try {
        const logs = await this.rpc(`getLogs(${a}-${b})`, () =>
          provider.getLogs({
            address: req.address,
            fromBlock: a,
            toBlock: b,
            topics: req.topics,
          }),
        );
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

    const b = await this.rpc(`getBlock(${blockNumber})`, () =>
      provider.getBlock(blockNumber),
    );
    if (!b) throw new Error(`Block not found: ${blockNumber}`);

    const ts = Number(b.timestamp);
    cache.set(blockNumber, ts);
    return ts;
  }

  // ============================
  // Decoding helpers
  // ============================

  private dataWordToAddress(data: string, wordIndex: number): string | null {
    if (!data) return null;
    const hex = data.startsWith('0x') ? data.slice(2) : data;

    const wordStart = wordIndex * 64;
    const wordEnd = wordStart + 64;
    if (hex.length < wordEnd) return null;

    // address is the last 20 bytes of the 32-byte word
    const addrHex = hex.slice(wordStart + 24, wordEnd);
    return normAddr('0x' + addrHex);
  }

  private chunk<T>(arr: T[], size: number): T[][] {
    if (arr.length === 0) return [];
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }
}
