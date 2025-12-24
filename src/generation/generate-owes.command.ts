import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { RewardsService } from 'contract/rewards.service';
import { JsonService } from 'json/json.service';
import { CompoundVersion } from 'common/types/compound-version';
import { fmtPct } from 'common/utils/fmt-pct';
import { IndexerService } from 'indexer/indexer.service';
import { MarkdownService } from './markdown.service';

@Command({ name: 'owes:generate', description: 'Generate owes' })
export class GenerateOwesCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateOwesCommand.name);

  constructor(
    private readonly json: JsonService,
    private readonly indexer: IndexerService,
    private readonly rewards: RewardsService,
    private readonly markdown: MarkdownService,
  ) {
    super();
  }

  private async calcOwesV3(): Promise<Record<string, bigint>> {
    const owes = this.rewards.zeroOwes(CompoundVersion.V3);

    const BATCH = 1000;
    const networks = Object.keys(owes);

    const results = await Promise.allSettled(
      networks.map(async (network) => {
        let offset = 0;
        let totalSum = 0n;
        let page = 0;

        const totalUsers = this.indexer.countUsersForNetwork(
          CompoundVersion.V3,
          network,
        );

        while (true) {
          page += 1;

          const pct = fmtPct(
            Math.min(offset, totalUsers),
            Math.max(1, totalUsers),
            2,
          );
          this.logger.verbose(`[${network} (${pct})] page -> ${page}`);

          const batch = await this.indexer.fetchUsersForNetwork(
            CompoundVersion.V3,
            network,
            BATCH,
            offset,
          );

          if (batch.length === 0) break;

          try {
            const sum = await this.rewards.sumOwedForUsersV3({
              network,
              users: batch,
              chunkSize: BATCH,
            });

            totalSum += sum;
          } catch (err) {
            this.logger.error(
              `[V3][owes][${network}][page=${page}] sumOwedForUsersV3 failed`,
              err,
            );
            // Skip this page and continue
          }

          offset += BATCH;
          if (batch.length < BATCH) break;
        }

        return [network, totalSum] as const;
      }),
    );

    for (const r of results) {
      if (r.status === 'fulfilled') {
        const [network, sum] = r.value;
        owes[network] = (owes[network] ?? 0n) + sum;
      } else {
        this.logger.error(`[V3][owes] Network task failed`, r.reason as any);
        // keep owes[network] as 0n
      }
    }

    return owes;
  }

  async run() {
    try {
      this.logger.log('Generating total owes V3...');
      const resultsV3 = await this.calcOwesV3();
      const owesV3 = this.rewards.formatOwes(resultsV3);

      this.json.writeOwes(owesV3, CompoundVersion.V3);
      const nested = this.json.readMarkets();

      // const owesV3 = this.json.readOwes(CompoundVersion.V3);
      this.markdown.writeRewardsMd(nested, owesV3);

      this.logger.log('Generating of totalOwesV3 completed.');
      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }
}
