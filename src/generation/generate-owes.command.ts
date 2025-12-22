import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { RewardsService } from 'contract/rewards.service';
import { JsonService } from 'json/json.service';
import { CompoundVersion } from 'common/types/compound-version';
import { IndexerService } from 'indexer/indexer.service';

@Command({ name: 'owes:generate', description: 'Generate owes' })
export class GenerateOwesCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateOwesCommand.name);

  constructor(
    private readonly jsonService: JsonService,
    private readonly indexer: IndexerService,
    private readonly rewardsService: RewardsService,
  ) {
    super();
  }

  private async calcOwesV3(): Promise<Record<string, bigint>> {
    const owes = this.rewardsService.zeroOwes(CompoundVersion.V3);

    const BATCH = 1000;
    const networks = Object.keys(owes);

    const results = await Promise.allSettled(
      networks.map(async (network) => {
        let offset = 0;
        let totalSum = 0n;
        let page = 0;

        while (true) {
          page += 1;

          this.logger.verbose(`[${network}] page -> ${page}`);

          const batch = await this.indexer.fetchUsersForNetwork(
            CompoundVersion.V3,
            network,
            BATCH,
            offset,
          );

          if (batch.length === 0) break;

          try {
            const sum = await this.rewardsService.sumOwedForUsersV3({
              network,
              users: batch,
              chunkSize: BATCH,
            });

            totalSum += sum;
          } catch (err) {
            this.logger.error(
              `[V3][owes][${network}][page=${page}] sumOwedForUsersV3 failed`,
              err as any,
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
      await this.indexer.run();
      this.logger.log('Generating total owes V3...');

      const v3Results = await this.calcOwesV3();

      this.jsonService.writeOwes(
        this.rewardsService.formatOwes(v3Results),
        CompoundVersion.V3,
      );
      this.logger.log('Generating of totalOwesV3 completed.');
      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }
}
