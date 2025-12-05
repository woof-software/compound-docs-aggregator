import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DuneClaimedV3, DuneConfig, DuneResult } from './dune.types';

@Injectable()
export class DuneService {
  private readonly logger = new Logger(DuneService.name);
  private readonly config: DuneConfig;

  constructor(config: ConfigService) {
    this.config = config.getOrThrow<DuneConfig>('dune');
  }

  private async fetch<T>(queryId: number | string): Promise<DuneResult<T>> {
    const res = await fetch(
      `${this.config.url}/api/v1/query/${queryId}/results`,
      {
        method: 'GET',
        headers: {
          'x-dune-api-key': this.config.apiKey,
          accept: 'application/json',
        },
      },
    );

    if (!res.ok) {
      const text = await res.text();
      this.logger.error('Dune API error:', res.status, res.statusText);
      this.logger.error(text);
      // process.exit(1);
    }

    return res.json();
  }

  /**
   * @returns network -> rewards claimed
   */
  public async fetchRewardsClaimedV3(): Promise<Record<string, number>> {
    const raw = await this.fetch<DuneClaimedV3>(this.config.queryId);
    return raw.result.rows.reduce((acc, item) => {
      acc[item.network] = item.total_comp_claimed;
      return acc;
    }, {} as Record<string, number>);
  }
}
