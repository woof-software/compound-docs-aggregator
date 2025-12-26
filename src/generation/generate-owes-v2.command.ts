import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { RewardsService } from 'contract/rewards.service';
import { JsonService } from 'json/json.service';
import { CompoundVersion } from 'common/types/compound-version';
import { fmtPct } from 'common/utils/fmt-pct';
import { IndexerService } from 'indexer/indexer.service';
import { NetworkConfig } from 'network/network.types';
import { ConfigService } from '@nestjs/config';

@Command({ name: 'owes:generate-v2', description: 'Generate V2 owes' })
export class GenerateOwesV2Command extends CommandRunner {
  private readonly logger = new Logger(GenerateOwesV2Command.name);
  private readonly batchSize = 1000;

  private readonly comptrollers: Map<string, string>;

  constructor(
    private readonly json: JsonService,
    private readonly indexer: IndexerService,
    private readonly rewards: RewardsService,
    private readonly config: ConfigService,
  ) {
    super();
    this.comptrollers = new Map<string, string>(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.networksList.map((n) => [n.network, n.comptrollerV2!]),
    );
  }

  private get networksList() {
    return this.config
      .getOrThrow<NetworkConfig[]>('networks')
      .filter((n) => n.comptrollerV2);
  }

  private async calcOwesV2(): Promise<Record<string, bigint>> {
    const owes = this.rewards.zeroOwes(CompoundVersion.V2);

    const BATCH = this.batchSize;
    const networks = Object.keys(owes);

    type NetworkSum = readonly [string, bigint];

    const tasks: Promise<NetworkSum>[] = networks.map(
      async (network): Promise<NetworkSum> => {
        const comptroller = this.comptrollers.get(network);

        // ✅ Always return a tuple (never `undefined`)
        if (!comptroller) {
          this.logger.warn(`No comptroller found for ${network}`);
          return [network, 0n] as const;
        }

        let offset = 0;
        let totalSum = 0n;
        let page = 0;

        const totalUsers = this.indexer.countUsersForNetwork(
          CompoundVersion.V2,
          network,
        );

        while (true) {
          page += 1;

          const pct = fmtPct(
            Math.min(offset, totalUsers),
            Math.max(1, totalUsers),
            2,
          );
          this.logger.verbose(`[${network} V2 (${pct})] page -> ${page}`);

          const batch = await this.indexer.fetchUsersForNetwork(
            CompoundVersion.V2,
            network,
            BATCH,
            offset,
          );

          if (batch.length === 0) break;

          try {
            const sum = await this.rewards.sumOwedForUsersV2({
              network,
              comptroller,
              users: batch as any, // string[] or [{ userAddress }]
              chunkSize: BATCH,
            });

            totalSum += sum;
          } catch (err) {
            this.logger.error(
              `[V2][owes][${network}][page=${page}] sumOwedForUsersV2 failed`,
              err as any,
            );
            // Skip this page and continue
          }

          offset += BATCH;
          if (batch.length < BATCH) break;
        }

        return [network, totalSum] as const;
      },
    );

    const results: PromiseSettledResult<NetworkSum>[] =
      await Promise.allSettled(tasks);

    for (const r of results) {
      if (r.status === 'fulfilled') {
        const [network, sum] = r.value;
        owes[network] = (owes[network] ?? 0n) + sum;
      } else if (r.status === 'rejected') {
        this.logger.error(`[V2][owes] Network task failed`, r.reason as any);
      }
    }

    return owes;
  }

  private async heal(results: Record<string, bigint>): Promise<void> {
    const mainnet = this.networksList.find((n) => (n.chainId = 1));

    if (!mainnet || !mainnet.comp) {
      throw new Error('Not found config for mainnet');
    }

    const mainnetValue = await this.rewards.getHealedRewardsV2({
      network: mainnet.network,
      doctorContract: '0xc00e94cb662c3520282e6f5717214004a7f26888',
      comp: mainnet.comp,
    });

    if (typeof results[mainnet.network] === 'bigint') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      results[mainnet.network]! += mainnetValue;
    }
  }

  async run() {
    try {
      this.logger.log('Generating total owes V2...');
      const resultsV2 = await this.calcOwesV2();
      // !: no need in heal while using accrue call
      // await this.heal(resultsV2);
      const owesV2 = this.rewards.formatOwes(resultsV2);

      this.json.writeOwes(owesV2, CompoundVersion.V2);

      this.logger.log('Generating of totalOwesV2 completed.');
      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }
}
