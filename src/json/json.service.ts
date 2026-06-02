import { Injectable, Logger } from '@nestjs/common';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

import { MarketData, NestedMarkets } from 'contract/contract.types';

@Injectable()
export class JsonService {
  private readonly logger = new Logger(JsonService.name);
  private readonly rootPathMarkets = join(process.cwd(), 'output.json');

  writeMarkets(markets: MarketData[]) {
    const filePath = this.rootPathMarkets;
    const nested: Record<string, Record<string, any>> = {};

    for (const m of markets) {
      const { network, market, contracts, curve, baseToken, collaterals } = m;

      if (!nested[network]) {
        nested[network] = {};
      }

      nested[network][market] = {
        contracts,
        curve,
        baseToken,
        collaterals,
      };
    }

    const output: NestedMarkets = {
      markets: nested,
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
