import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { ConfigService } from '@nestjs/config';

import { RewardsService } from 'contract/rewards.service';
import { JsonService } from 'json/json.service';
import { CompoundVersion } from 'common/types/compound-version';
import { fmtPct } from 'common/utils/fmt-pct';
import { RuntimeDbService } from 'indexer/runtime-db.service';
import { NetworkConfig } from 'network/network.types';
import { OwesExportService } from './owes-export.service';

@Command({ name: 'owes:generate-v2', description: 'Generate V2 owes' })
export class GenerateOwesV2Command extends CommandRunner {
  private readonly logger = new Logger(GenerateOwesV2Command.name);

  // Paging over users table
  private readonly pageSize = 1000;

  // Parallel networks (keep low; sqlite is one file)
  private readonly maxParallelNetworks = 2;

  private readonly comptrollers: Map<string, string>;

  constructor(
    private readonly json: JsonService,
    private readonly db: RuntimeDbService,
    private readonly rewards: RewardsService,
    private readonly exp: OwesExportService,
    private readonly config: ConfigService,
  ) {
    super();

    this.comptrollers = new Map<string, string>(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.networksList.map((n) => [n.network, n.comptrollerV2!]),
    );
  }

  private get networksList(): NetworkConfig[] {
    return this.config
      .getOrThrow<NetworkConfig[]>('networks')
      .filter((n) => n.comptrollerV2 && n.rewardsCalcEnabled);
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

  private async calcOwesV2(): Promise<Record<string, bigint>> {
    const owes = this.rewards.zeroOwes(CompoundVersion.V2);
    const networks = this.networksList.map((n) => n.network);

    const PAGE = this.pageSize;

    await this.runWithConcurrency(
      networks,
      this.maxParallelNetworks,
      async (network) => {
        const comptroller = this.comptrollers.get(network);

        if (!comptroller) {
          this.logger.warn(`[V2][${network}] No comptroller found in config`);
          return;
        }

        const totalUsers = this.db.countUsersForNetwork(
          CompoundVersion.V2,
          network,
        );

        let offset = 0;
        let page = 0;

        while (true) {
          page += 1;

          const pct = fmtPct(
            Math.min(offset, totalUsers),
            Math.max(1, totalUsers),
            2,
          );
          this.logger.verbose(
            `[V2][${network}] page=${page} (${pct}) offset=${offset}/${totalUsers}`,
          );

          const batch = await this.db.fetchUsersForNetwork(
            CompoundVersion.V2,
            network,
            PAGE,
            offset,
          );

          if (batch.length === 0) break;

          // RewardsService V2 only needs userAddress
          const v2Users = batch.map((u) => ({ userAddress: u.userAddress }));

          try {
            const owedRows = await this.rewards.owedForUsers({
              version: CompoundVersion.V2,
              network,
              market: comptroller, // V2 "market" = comptroller
              users: v2Users,
              chunkSize: PAGE, // multicall chunk
            });

            this.db.upsertOwesBatch({
              network,
              version: CompoundVersion.V2,
              rows: owedRows,
            });
          } catch (err) {
            this.logger.error(
              `[V2][owes][${network}][page=${page}] owedForUsers failed`,
              err as any,
            );
            // Skip this page and continue
          }

          offset += batch.length;
          if (batch.length < PAGE) break;
        }
      },
    );

    // Totals are read from DB (no in-loop accumulation).
    const totals = this.db.getOwesTotalsByNetwork(CompoundVersion.V2);
    for (const n of Object.keys(owes)) owes[n] = totals[n] ?? 0n;

    return owes;
  }

  async run(): Promise<void> {
    try {
      this.logger.log('Generating total owes V2...');

      await this.db.assemble();
      this.db.resetOwes(CompoundVersion.V2);

      const resultsV2 = await this.calcOwesV2();

      const owesV2 = this.rewards.formatOwes(resultsV2);
      this.json.writeOwes(owesV2, CompoundVersion.V2);

      this.exp.exportDetailedOwes(CompoundVersion.V2);

      this.db.closeRuntime();

      this.logger.log('Generating of totalOwesV2 completed.');
    } catch (error) {
      this.logger.error(
        'An error occurred while generating owes V2:',
        error as any,
      );
      try {
        this.db.closeRuntime();
      } catch {}
    }
  }
}
