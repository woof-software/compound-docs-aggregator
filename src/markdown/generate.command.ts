import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { GithubService } from 'github/github.service';
import { ContractService } from 'contract/contract.service';
import { JsonService } from 'json/json.service';
import { DuneService } from 'dune/dune.service';
import { MarkdownService } from './markdown.service';
import { ethers } from 'ethers';
import { CompoundVersion } from 'common/types/compound-version';
import { IndexerService } from '../indexer/indexer.service';

@Command({ name: 'markdown:generate', description: 'Generate markdown' })
export class GenerateMarkdownCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateMarkdownCommand.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly contractService: ContractService,
    private readonly jsonService: JsonService,
    private readonly markdownService: MarkdownService,
    private readonly dune: DuneService,
    private readonly indexer: IndexerService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  private get networksList() {
    return this.config.getOrThrow<
      {
        network: string;
        url: string;
      }[]
    >('networks');
  }

  private zeroOwes(version: CompoundVersion): Record<string, bigint> {
    return version === CompoundVersion.V2
      ? ({ mainnet: 0n } as Record<string, bigint>)
      : this.networksList.reduce((acc, item) => {
          if (!acc[item.network]) {
            acc[item.network] = 0n;
          }

          return acc;
        }, {} as Record<string, bigint>);
  }

  private formatOwes(owes: Record<string, bigint>): Record<string, number> {
    return Object.entries(owes).reduce((acc, [key, value]) => {
      acc[key] = Number(ethers.formatUnits(value, 18));

      return acc;
    }, {} as Record<string, number>);
  }

  private async calcOwesV3(): Promise<Record<string, bigint>> {
    const owes = this.zeroOwes(CompoundVersion.V3);

    const BATCH = 1000;
    const networks = Object.keys(owes);

    const results = await Promise.allSettled(
      networks.map(async (network) => {
        let offset = 0;
        let totalSum = 0n;
        let page = 0;

        while (true) {
          page += 1;

          const batch = await this.indexer.fetchUsersForNetwork(
            CompoundVersion.V3,
            network,
            BATCH,
            offset,
          );

          if (batch.length === 0) break;

          try {
            const sum = await this.contractService.sumOwedForUsersV3({
              network,
              users: batch,
              chunkSize: BATCH, // => один multicall-батч
            });

            totalSum += sum;
          } catch (err) {
            this.logger.error(
              `[V3][owes][${network}][page=${page}] sumOwedForUsersV3 failed`,
              err as any,
            );
            // Skip this page and continue (or break — как хочешь)
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
      ////
      this.logger.log('Generating total owes V3...');

      const v3Results = await this.calcOwesV3();

      this.jsonService.writeOwes(
        this.formatOwes(v3Results),
        CompoundVersion.V3,
      );
      this.logger.log('Generating of totalOwesV3 completed.');
      ////

      this.logger.log('Starting to generate markdown...');

      const rootsPaths = await this.githubService.listAllRootsJson();
      this.logger.log(
        `Found ${rootsPaths.length} roots.json files in the repository`,
      );

      const marketsData: Array<any> = [];

      for (const path of rootsPaths) {
        const rawUrl = `https://raw.githubusercontent.com/compound-finance/comet/main/deployments/${path}`;

        let rootObj: any;
        try {
          const response = await axios.get(rawUrl, { responseType: 'json' });
          rootObj = response.data;
        } catch (err) {
          this.logger.error(
            `Error reading JSON from ${rawUrl}:`,
            err instanceof Error ? err.message : String(err),
          );
          continue;
        }

        let marketData;
        try {
          marketData = await this.contractService.readMarketData(rootObj, path);
        } catch (err) {
          this.logger.error(
            `Error reading on-chain data for ${path}:`,
            err instanceof Error ? err.message : String(err),
          );
          this.logger.error(rootObj);
          continue;
        }

        this.logger.debug(
          `Found data for ${marketData.network} - ${marketData.market}`,
        );
        marketsData.push(marketData);
      }

      // Generate JSON file with all markets data
      const jsonPath = this.jsonService.writeMarkets(marketsData);
      this.logger.log(`JSON generated: ${jsonPath}`);

      // Read the structured data for markdown generation
      const nestedMarketsData = this.jsonService.readMarkets(); // market rewards -> rewards table

      // Update README.md with hierarchical structure
      this.markdownService.write(nestedMarketsData, jsonPath);
      this.logger.log(`README.md updated with hierarchical market data`);

      // Update compound-3.md deployments section
      this.markdownService.updateCompound3Deployments(nestedMarketsData);
      this.logger.log(`compound-3.md deployments section updated`);

      this.logger.log('Generating of markdown completed.');

      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }
}
