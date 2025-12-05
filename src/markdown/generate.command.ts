import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import axios from 'axios';

import { GithubService } from 'github/github.service';
import { ContractService } from 'contract/contract.service';
import { JsonService } from 'json/json.service';
import { DuneService } from 'dune/dune.service';
import { MarkdownService } from './markdown.service';
import { RewardRecord } from '../contract/contract.types';

@Command({ name: 'markdown:generate', description: 'Generate markdown' })
export class GenerateMarkdownCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateMarkdownCommand.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly contractService: ContractService,
    private readonly jsonService: JsonService,
    private readonly markdownService: MarkdownService,
    private readonly dune: DuneService,
  ) {
    super();
  }

  async run() {
    try {
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
      const nestedMarketsData = this.jsonService.readMarkets();

      // Update README.md with hierarchical structure
      this.markdownService.write(nestedMarketsData, jsonPath);
      this.logger.log(`README.md updated with hierarchical market data`);

      this.logger.log('Generating of markdown completed.');

      this.logger.log('Generating total owes V3...');
      const claimed = await this.dune.fetchRewardsClaimedV3();
      const totalOwesV3 = this.calcTotalOwesV3(
        claimed,
        nestedMarketsData.rewards.marketRewards,
      );
      this.jsonService.writeOwesV3(totalOwesV3);
      this.logger.log('Generating of totalOwesV3 completed.');

      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }

  /**
   * @param claimed
   * @param records
   * @returns record network -> total owe
   * @private
   */
  private calcTotalOwesV3(
    claimed: Record<string, number>,
    records: RewardRecord[],
  ): Record<string, number> {
    return records.reduce((acc, item) => {
      const network = item.network;
      const networkClaimed = claimed[network];
      if (!networkClaimed) {
        this.logger.warn(`Skip network ${network}: no dune data`);
        return acc;
      }

      if (!acc[network]) {
        acc[network] = -networkClaimed;
      }

      acc[network] += item.yearlyRewards;

      return acc;
    }, {} as Record<string, number>);
  }
}
