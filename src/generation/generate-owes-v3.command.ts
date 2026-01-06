import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { ConfigService } from '@nestjs/config';

import { RewardsService } from 'contract/rewards.service';
import { JsonService } from 'json/json.service';
import { CompoundVersion } from 'common/types/compound-version';
import { fmtPct } from 'common/utils/fmt-pct';
import { NetworkConfig } from 'network/network.types';
import { RuntimeDbService } from 'indexer/runtime-db.service';
import { OwesExportService } from './owes-export.service';

@Command({ name: 'owes:generate-v3', description: 'Generate V3 owes' })
export class GenerateOwesV3Command extends CommandRunner {
  private readonly logger = new Logger(GenerateOwesV3Command.name);

  // Paging over users table
  private readonly pageSize = 1000;

  // Multicall chunk size for V3 getRewardOwed (usually heavier than V2)
  private readonly multicallChunkSize = 400;

  // Parallel networks (keep low; sqlite is one file)
  private readonly maxParallelNetworks = 2;

  constructor(
    private readonly json: JsonService,
    private readonly db: RuntimeDbService,
    private readonly rewards: RewardsService,
    private readonly exp: OwesExportService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  private get networksList(): NetworkConfig[] {
    return this.config
      .getOrThrow<NetworkConfig[]>('networks')
      .filter((n) => n.rewardsCalcEnabled);
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

  private async calcOwesV3(): Promise<Record<string, bigint>> {
    const owes = this.rewards.zeroOwes(CompoundVersion.V3);
    const networks = this.networksList.map((n) => n.network);

    const PAGE = this.pageSize;

    await this.runWithConcurrency(
      networks,
      this.maxParallelNetworks,
      async (network) => {
        const totalUsers = this.db.countUsersForNetwork(
          CompoundVersion.V3,
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
            `[V3][${network}] page=${page} (${pct}) offset=${offset}/${totalUsers}`,
          );

          const batch = await this.db.fetchUsersForNetwork(
            CompoundVersion.V3,
            network,
            PAGE,
            offset,
          );

          if (batch.length === 0) break;

          try {
            // batch already matches RewardsService UserRewardCall shape:
            // { rewardsAddress, cometAddress, userAddress }
            const owedRows = await this.rewards.owedForUsers({
              version: CompoundVersion.V3,
              network,
              users: batch,
              chunkSize: this.multicallChunkSize,
            });

            this.db.upsertOwesBatch({
              network,
              version: CompoundVersion.V3,
              rows: owedRows,
            });
          } catch (err) {
            this.logger.error(
              `[V3][owes][${network}][page=${page}] owedForUsers failed`,
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
    const totals = this.db.getOwesTotalsByNetwork(CompoundVersion.V3);
    for (const n of Object.keys(owes)) owes[n] = totals[n] ?? 0n;

    return owes;
  }

  async run(): Promise<void> {
    try {
      this.logger.log('Generating total owes V3...');

      await this.db.assemble();
      this.db.resetOwes(CompoundVersion.V3);

      const resultsV3 = await this.calcOwesV3();

      const owesV3 = this.rewards.formatOwes(resultsV3);
      this.json.writeOwes(owesV3, CompoundVersion.V3);

      this.exp.exportDetailedOwes(CompoundVersion.V3);

      this.db.closeRuntime();

      this.logger.log('Generating of totalOwesV3 completed.');
    } catch (error) {
      this.logger.error(
        'An error occurred while generating owes V3:',
        error as any,
      );
      try {
        this.db.closeRuntime();
      } catch {}
    }
  }
}
