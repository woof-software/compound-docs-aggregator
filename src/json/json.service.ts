import { Injectable, Logger } from '@nestjs/common';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

import {
  MarketData,
  NestedMarkets,
  NetworkCompBalanceRecord,
  NetworkCompBalanceTable,
  RewardRecord,
} from 'contract/contract.types';
import { CompoundVersion } from 'common/types/compound-version';

@Injectable()
export class JsonService {
  private readonly logger = new Logger(JsonService.name);
  private readonly rootPathMarkets = join(process.cwd(), 'output.json');
  private readonly rootPathOwesV2 = join(process.cwd(), 'owes-v2.json');
  private readonly rootPathOwesV3 = join(process.cwd(), 'owes-v3.json');

  writeOwes(owes: Record<string, number>, version: CompoundVersion): string {
    const path =
      version === CompoundVersion.V2
        ? this.rootPathOwesV2
        : this.rootPathOwesV3;

    const sorted = Object.fromEntries(
      Object.entries(owes).sort(([keyA, valA], [keyB, valB]) => {
        const byValue = valB - valA;
        if (byValue !== 0) return byValue;
        return keyA.localeCompare(keyB); // secondary: name/key
      }),
    ) as Record<string, number>;

    writeFileSync(path, JSON.stringify(sorted, null, 2));
    return path;
  }

  writeMarkets(markets: MarketData[]) {
    const filePath = this.rootPathMarkets;
    const nested: Record<string, Record<string, any>> = {};
    const marketRewards: RewardRecord[] = [];
    const networkCompBalances: Map<string, number> = new Map();

    let totalDailyRewards = 0;
    let totalYearlyRewards = 0;
    for (const m of markets) {
      const { network, market, contracts, curve, collaterals, rewardsTable } =
        m;

      if (!nested[network]) {
        nested[network] = {};
      }

      nested[network][market] = {
        contracts,
        curve,
        collaterals,
      };

      if (rewardsTable) {
        marketRewards.push(rewardsTable);

        totalDailyRewards += rewardsTable.dailyRewards;
        totalYearlyRewards += rewardsTable.yearlyRewards;

        if (!networkCompBalances.has(network)) {
          networkCompBalances.set(
            network,
            rewardsTable.compAmountOnRewardContract,
          );
        }
      }
    }

    const networkCompBalanceRecords: NetworkCompBalanceRecord[] = [];
    let totalCompBalance = 0;
    let idx = 0;

    for (const [network, balance] of networkCompBalances) {
      networkCompBalanceRecords.push({
        idx: idx++,
        date: new Date().toISOString().split('T')[0] as string,
        network,
        currentCompBalance: balance,
      });
      totalCompBalance += balance;
    }

    const networkCompBalanceTable: NetworkCompBalanceTable = {
      networks: networkCompBalanceRecords,
      totalCompBalance,
    };

    const output: NestedMarkets = {
      markets: nested,
      rewards: {
        marketRewards,
        totalDailyRewards,
        totalYearlyRewards,
      },
      networkCompBalance: networkCompBalanceTable,
    };

    try {
      writeFileSync(filePath, JSON.stringify(output, null, 2));
      return filePath;
    } catch (err) {
      this.logger.error(
        `Failed to write ${filePath}: ${(err as Error).message}`,
      );
      throw err;
    }
  }

  readMarkets(): NestedMarkets {
    const filePath = this.rootPathMarkets;

    try {
      if (!existsSync(filePath)) {
        throw new Error(`File ${filePath} does not exist`);
      }

      const fileContent = readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(fileContent) as NestedMarkets;

      return parsedData;
    } catch (err) {
      this.logger.error(
        `Failed to read ${filePath}: ${(err as Error).message}`,
      );
      throw err;
    }
  }

  getMarketsByNetwork(network: string) {
    try {
      const data = this.readMarkets();
      return data.markets[network] || null;
    } catch (err) {
      this.logger.error(
        `Failed to get markets for network ${network}: ${
          (err as Error).message
        }`,
      );
      return null;
    }
  }

  getMarketData(network: string, market: string) {
    try {
      const networkData = this.getMarketsByNetwork(network);
      return networkData?.[market] || null;
    } catch (err) {
      this.logger.error(
        `Failed to get market data for ${network}/${market}: ${
          (err as Error).message
        }`,
      );
      return null;
    }
  }
}
