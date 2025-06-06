import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import axios from 'axios';

import { GithubService } from 'github/github.service';
import { ContractService } from 'contract/contract.service';
import { ExcelService } from 'excel/excel.service';
import { MarkdownService } from './markdown.service';

@Command({ name: 'markdown:generate', description: 'Geenerate markdown' })
export class GenerateMarkdownCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateMarkdownCommand.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly contractService: ContractService,
    private readonly excelService: ExcelService,
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

        this.logger.log('rootObj :', rootObj);
        let marketData;
        try {
          marketData = await this.contractService.readMarketData(rootObj, path);
        } catch (err) {
          this.logger.error(
            `Error reading on-chain from ${path}:`,
            err instanceof Error ? err.message : String(err),
          );
          continue;
        }

        marketsData.push(marketData);
      }

      // Genearate Excel file with all markets data
      const excelPath = await this.excelService.generate(marketsData);
      this.logger.log(`Excel generated: ${excelPath}`);

      // 5) Update README.md
      this.markdownService.write(marketsData, excelPath);
      this.logger.log(`README.md updated with market data`);

      this.logger.log('Generating of markdown completed.');
      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }
}
