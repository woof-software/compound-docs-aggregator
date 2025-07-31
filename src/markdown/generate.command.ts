import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import axios from 'axios';

import { GithubService } from 'github/github.service';
import { ContractService } from 'contract/contract.service';
import { MarkdownService } from './markdown.service';
import { JsonService } from 'json/json.service';
import { CompoundDocumentationService } from 'compound-documentation/compound-documentation.service';

@Command({ name: 'markdown:generate', description: 'Generate markdown' })
export class GenerateMarkdownCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateMarkdownCommand.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly contractService: ContractService,
    private readonly jsonService: JsonService,
    private readonly markdownService: MarkdownService,
    private readonly documentationService: CompoundDocumentationService,
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

          this.logger.debug(path);
        } catch (err) {
          this.logger.error(
            `Error reading on-chain data for ${path}:`,
            err instanceof Error ? err.message : String(err),
          );
          this.logger.error(rootObj);
          continue;
        }

        marketsData.push(marketData);
      }

      // Generate JSON file with all markets data
      const jsonPath = this.jsonService.write(marketsData);
      this.logger.log(`JSON generated: ${jsonPath}`);

      // Read the structured data for markdown generation
      const nestedMarketsData = this.jsonService.read();

      // // Update documentation and create pull request
      try {
        // await this.documentationService.writeLocal(nestedMarketsData);
        const prResult = await this.documentationService.updateDocumentation(
          nestedMarketsData,
        );

        if (prResult.created) {
          this.logger.log(`✅ Pull request created successfully!`);
          this.logger.log(`🔗 URL: ${prResult.url}`);
          this.logger.log(`📋 PR Number: ${prResult.number}`);
        } else if (prResult.error) {
          this.logger.error(
            `❌ Failed to create pull request: ${prResult.error}`,
          );
        } else {
          this.logger.log(
            `ℹ️ No changes detected in deployments. No PR needed.`,
          );
        }
      } catch (error) {
        this.logger.error('Error in documentation update process:', error);
      }

      // Update README.md with hierarchical structure
      this.markdownService.write(nestedMarketsData, jsonPath);
      this.logger.log(`README.md updated with hierarchical market data`);

      this.logger.log('Generation of markdown completed.');
      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }
}
