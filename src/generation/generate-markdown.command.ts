import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import axios from 'axios';

import { GithubService } from 'github/github.service';
import { ContractService } from 'contract/contract.service';
import { JsonService } from 'json/json.service';
import { MarkdownService } from './markdown.service';

@Command({ name: 'markdown:generate', description: 'Generate markdown' })
export class GenerateMarkdownCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateMarkdownCommand.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly contractService: ContractService,
    private readonly jsonService: JsonService,
    private readonly markdownService: MarkdownService,
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
