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

@Command({ name: 'markdown:generate', description: 'Generate markdown' })
export class GenerateMarkdownCommand extends CommandRunner {
  private readonly logger = new Logger(GenerateMarkdownCommand.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly contractService: ContractService,
    private readonly jsonService: JsonService,
    private readonly markdownService: MarkdownService,
    private readonly dune: DuneService,
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

    const limit = 10_000;
    let offset = 0;
    let page = 0;

    this.logger.verbose(
      `[V3][owes] Start calcOwesV3: limit=${limit}, initialOffset=${offset}`,
    );

    while (true) {
      page += 1;
      const pageStartedAt = Date.now();

      this.logger.verbose(
        `[V3][owes][page=${page}] Fetch users: offset=${offset}, limit=${limit}`,
      );

      const users = await this.dune.fetchUsers(
        CompoundVersion.V3,
        limit,
        offset,
      );

      const perNetworkCounts = Object.fromEntries(
        Object.entries(users).map(([network, arr]) => [network, arr.length]),
      ) as Record<string, number>;

      const total = Object.values(perNetworkCounts).reduce(
        (acc, n) => acc + n,
        0,
      );

      this.logger.verbose(
        `[V3][owes][page=${page}] Users fetched: total=${total}, perNetwork=${JSON.stringify(
          perNetworkCounts,
        )}`,
      );

      if (total === 0) {
        this.logger.verbose(
          `[V3][owes][page=${page}] No users returned. Stop.`,
        );
        break;
      }

      const entries = Object.entries(users).filter(([, arr]) => arr.length > 0);

      this.logger.verbose(
        `[V3][owes][page=${page}] Start processing networks: ${entries
          .map(([n, arr]) => `${n}(${arr.length})`)
          .join(', ')}`,
      );

      const networkSums = await Promise.all(
        entries.map(async ([network, userData]) => {
          const startedAt = Date.now();
          this.logger.verbose(
            `[V3][owes][page=${page}][${network}] Start sumOwedForUsersV3: users=${userData.length}, chunkSize=1000`,
          );

          try {
            const sum = await this.contractService.sumOwedForUsersV3({
              network,
              users: userData,
              chunkSize: 1000,
            });

            const ms = Date.now() - startedAt;
            this.logger.verbose(
              `[V3][owes][page=${page}][${network}] Done sumOwedForUsersV3: sum=${sum.toString()} (raw), ms=${ms}`,
            );

            return [network, sum] as const;
          } catch (err) {
            const ms = Date.now() - startedAt;
            this.logger.error(
              `[V3][owes][page=${page}][${network}] sumOwedForUsersV3 failed after ms=${ms}`,
              err as any,
            );
            // Do not fail entire page; treat as 0 for this network on this page
            return [network, 0n] as const;
          }
        }),
      );

      for (const [network, sum] of networkSums) {
        const prev = owes[network] ?? 0n;
        const next = prev + sum;
        owes[network] = next;

        this.logger.verbose(
          `[V3][owes][page=${page}][${network}] Accumulate: prev=${prev.toString()} + add=${sum.toString()} => total=${next.toString()}`,
        );
      }

      const pageMs = Date.now() - pageStartedAt;
      this.logger.verbose(
        `[V3][owes][page=${page}] Page done: ms=${pageMs}, nextOffset=${
          offset + limit
        }, stopIfTotalLessThanLimit=${total < limit}`,
      );

      offset += limit;
      if (total < limit) {
        this.logger.verbose(
          `[V3][owes][page=${page}] total(${total}) < limit(${limit}). Stop.`,
        );
        break;
      }
    }

    this.logger.verbose(
      `[V3][owes] Finished calcOwesV3. Result per network: ${JSON.stringify(
        Object.fromEntries(
          Object.entries(owes).map(([n, v]) => [n, v.toString()]),
        ),
      )}`,
    );

    return owes;
  }

  async run() {
    try {
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

      this.logger.log('Generating of markdown completed.');

      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }
}
