import { setTimeout } from 'node:timers/promises';
import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import axios from 'axios';

import { GithubService } from 'github/github.service';
import { ContractService } from 'contract/contract.service';
import { JsonService } from 'json/json.service';
import { DuneService } from 'dune/dune.service';
import { MarkdownService } from './markdown.service';
import {
  DuneActivities,
  DuneActivity,
  DuneClaimed,
  DuneCometSpeedPeriod,
  DuneCometsSpeedPeriods,
} from 'dune/dune.types';
import { ethers } from 'ethers';
import { CompoundVersion } from 'common/types/compound-version';

interface ActivityPeriod {
  startTime: Date;
  endTime: Date;
}

interface AccrualPeriods {
  supply: ActivityPeriod[];
  borrow: ActivityPeriod[];
}

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
      ////
      this.logger.log('Generating total owes V3...');
      const claimedV3 = await this.dune.fetchRewardsClaimed(CompoundVersion.V3);
      await setTimeout(2000);
      const periodsV3 = await this.dune.fetchSpeedsPeriods(CompoundVersion.V3);
      await setTimeout(2000);
      const activitiesV3 = await this.dune.fetchActivityPeriods(
        CompoundVersion.V3,
      );

      const totalOwesV3 = this.calcTotalOwes(
        claimedV3,
        periodsV3,
        activitiesV3,
        CompoundVersion.V3,
      );
      this.jsonService.writeOwes(totalOwesV3, CompoundVersion.V3);
      this.logger.log('Generating of totalOwesV3 completed.');
      ////
      /*this.logger.log('Generating total owes V2...');
      const claimedV2 = await this.dune.fetchRewardsClaimed(CompoundVersion.V2);
      await setTimeout(2000);
      const periodsV2 = await this.dune.fetchSpeedsPeriods(CompoundVersion.V2);

      const totalOwesV2 = this.calcTotalOwes(
        claimedV2,
        periodsV2,
        CompoundVersion.V2,
      );
      this.jsonService.writeOwes(totalOwesV2, CompoundVersion.V2);
      this.logger.log('Generating of totalOwesV2 completed.');*/
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

  private calcRewardsV2(periodsV2: DuneCometSpeedPeriod[]): bigint {
    return periodsV2.reduce((sum, item) => {
      const durationBlocks = BigInt(
        item.periodEndBlock - item.periodStartBlock,
      );

      const supplyRewards = item.currSupplySpeed * durationBlocks;
      const borrowRewards = item.currBorrowSpeed * durationBlocks;

      return sum + supplyRewards + borrowRewards;
    }, 0n);
  }

  private calcRewardsV3(
    periodsV3: DuneCometSpeedPeriod[],
    activities: DuneActivity[],
  ): bigint {
    const durationSec = (from: Date, to: Date): bigint =>
      BigInt(from.getTime() - to.getTime()) / 1000n;
    return periodsV3.reduce((sum, item) => {
      const innerActivities = this.getAccrualPeriodsInRange(
        activities,
        item.periodStartTime,
        item.periodEndTime,
      );

      const supplyRewards = innerActivities.supply.reduce(
        (supply, activity) => {
          const duration = durationSec(activity.startTime, activity.endTime);
          return supply + item.currSupplySpeed * duration;
        },
        0n,
      );

      const borrowRewards = innerActivities.supply.reduce(
        (borrow, activity) => {
          const duration = durationSec(activity.startTime, activity.endTime);
          return borrow + item.currBorrowSpeed * duration;
        },
        0n,
      );

      return sum + supplyRewards + borrowRewards;
    }, 0n);
  }

  /**
   * @param claimed
   * @param periods
   * @param activities
   * @param version - means compound 3 or compound 2
   * @returns record: network -> total owe
   * @private
   */
  private calcTotalOwes(
    claimed: DuneClaimed,
    periods: DuneCometsSpeedPeriods,
    activities: DuneActivities,
    version: CompoundVersion,
  ): Record<string, number> {
    return Object.entries(claimed).reduce((acc, [network, claimed]) => {
      const networkPeriods = periods[network];
      if (!networkPeriods) {
        this.logger.warn(
          `[${version}] Skip network ${network}: no dune data -> networkPeriods`,
        );
        return acc;
      }

      const networkActivities = activities[network];
      if (!networkActivities) {
        this.logger.warn(
          `[${version}] Skip network ${network}: no dune data -> networkActivities`,
        );
        return acc;
      }

      type CometRewards = Record<string, bigint>;
      const cometsRewards = Object.entries(networkPeriods).reduce(
        (acc, [comet, periods]) => {
          const cometActivities = networkActivities[comet];
          if (!cometActivities) {
            this.logger.warn(
              `[${version}] Skip comet ${comet}: no dune data -> cometActivities`,
            );
            return acc;
          }

          if (!acc[comet]) {
            acc[comet] = 0n;
          }
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          acc[comet]! +=
            version === CompoundVersion.V2
              ? this.calcRewardsV2(periods)
              : this.calcRewardsV3(periods, cometActivities);

          return acc;
        },
        {} as CometRewards,
      );

      const totalRewards = Object.values(cometsRewards).reduce(
        (sum, val) => sum + val,
        0n,
      );

      const decimals = version === CompoundVersion.V2 ? 18 : 15;
      const rewards = Number(ethers.formatUnits(totalRewards, decimals));

      acc[network] = rewards - claimed;
      return acc;
    }, {} as Record<string, number>);
  }

  private getAccrualPeriodsInRange(
    activities: readonly DuneActivity[],
    startDate: Date,
    endDate: Date,
  ): AccrualPeriods {
    const rangeStart = startDate.getTime();
    const rangeEnd = endDate.getTime();

    if (Number.isNaN(rangeStart) || Number.isNaN(rangeEnd)) {
      throw new Error(`getAccrualPeriodsInRange: invalid startDate/endDate`);
    }
    if (rangeStart >= rangeEnd) {
      return { supply: [], borrow: [] };
    }

    const supplyRaw: Array<[number, number]> = [];
    const borrowRaw: Array<[number, number]> = [];

    for (const a of activities) {
      const s = a.startTime.getTime();
      const e = a.endTime.getTime();
      if (Number.isNaN(s) || Number.isNaN(e) || s >= e) continue;

      // intersection with [rangeStart, rangeEnd)
      const is = Math.max(s, rangeStart);
      const ie = Math.min(e, rangeEnd);
      if (is >= ie) continue;

      if (a.supplyActive) supplyRaw.push([is, ie]);
      if (a.borrowActive) borrowRaw.push([is, ie]);
    }

    return {
      supply: this.mergePeriods(supplyRaw),
      borrow: this.mergePeriods(borrowRaw),
    };
  }

  private mergePeriods(raw: Array<[number, number]>): ActivityPeriod[] {
    if (raw.length === 0) return [];

    raw.sort((a, b) => a[0] - b[0]);

    const merged: Array<[number, number]> = [];
    let [cs, ce] = raw[0]!;

    for (let i = 1; i < raw.length; i++) {
      const [ns, ne] = raw[i]!;

      // merge if overlap OR touch: ns <= ce
      if (ns <= ce) {
        if (ne > ce) ce = ne;
      } else {
        merged.push([cs, ce]);
        cs = ns;
        ce = ne;
      }
    }
    merged.push([cs, ce]);

    return merged.map(([s, e]) => ({
      startTime: new Date(s),
      endTime: new Date(e),
    }));
  }
}
