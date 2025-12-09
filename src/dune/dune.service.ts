import { setTimeout } from 'node:timers/promises';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DuneClaimedRowV3,
  DuneClaimedV3,
  DuneSpeedPeriodRowV3,
  DuneConfig,
  DuneResult,
  DuneCometsSpeedPeriodsV3,
  DuneCometSpeedPeriodV3,
} from './dune.types';

@Injectable()
export class DuneService {
  private readonly logger = new Logger(DuneService.name);
  private readonly config: DuneConfig;

  constructor(config: ConfigService) {
    this.config = config.getOrThrow<DuneConfig>('dune');
  }

  private get headers() {
    return {
      'x-dune-api-key': this.config.apiKey,
      accept: 'application/json',
    };
  }

  private async pollState(executionId: string): Promise<string> {
    const res = await fetch(
      `${this.config.url}/api/v1/execution/${executionId}/status`,
      {
        method: 'GET',
        headers: this.headers,
      },
    );

    if (!res.ok) {
      const text = await res.text();
      this.logger.error('Dune API error -> poll:', res.status, res.statusText);
      this.logger.error(text);
    }

    const json = await res.json();
    return json.state;
  }

  private async update(queryId: number | string): Promise<void> {
    const res = await fetch(
      `${this.config.url}/api/v1/query/${queryId}/execute`,
      {
        method: 'POST',
        headers: this.headers,
      },
    );

    if (!res.ok) {
      const text = await res.text();
      this.logger.error(
        'Dune API error -> update:',
        res.status,
        res.statusText,
      );
      this.logger.error(text);
    }

    let attemptsLeft = this.config.pollAttempts;
    // eslint-disable-next-line prefer-const
    let { execution_id: executionId, state } = await res.json();

    while (state !== this.config.pollForState && attemptsLeft) {
      this.logger.verbose(
        `[${attemptsLeft}] Dune polling the next state -> ${state}`,
      );
      await setTimeout(this.config.pollDelayMs);

      state = await this.pollState(executionId);

      attemptsLeft--;
    }

    if (!attemptsLeft) {
      this.logger.warn(
        `Dune state polling for ${queryId} stopped because there were no attempts left.`,
      );
    } else {
      this.logger.verbose(`Dune query ${queryId} has been updated.`);
    }
  }

  private async fetch<T>(queryId: number | string): Promise<DuneResult<T>> {
    const res = await fetch(
      `${this.config.url}/api/v1/query/${queryId}/results`,
      {
        method: 'GET',
        headers: this.headers,
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
  public async fetchRewardsClaimedV3(): Promise<DuneClaimedV3> {
    const queryId = this.config.queries.claimsV3;

    await this.update(queryId);
    const raw = await this.fetch<DuneClaimedRowV3>(queryId);

    return raw.result.rows.reduce((acc, item) => {
      acc[item.network] = item.total_comp_claimed;
      return acc;
    }, {} as DuneClaimedV3);
  }

  public async fetchSpeedsPeriodsV3(): Promise<DuneCometsSpeedPeriodsV3> {
    const queryId = this.config.queries.periodsV3;

    await this.update(queryId);
    const raw = await this.fetch<DuneSpeedPeriodRowV3>(queryId);
    return raw.result.rows.reduce((acc, item) => {
      const el: DuneCometSpeedPeriodV3 = {
        currBorrowSpeed: BigInt(item.curr_borrow_speed),
        currSupplySpeed: BigInt(item.curr_supply_speed),
        periodEndBlock: item.period_end_block,
        periodEndTime: new Date(item.period_end_time),
        periodStartBlock: item.period_start_block,
        periodStartTime: new Date(item.period_start_time),
        startingEventType: item.starting_event_type,
        startingTxHash: item.starting_tx_hash,
      };

      if (!acc[item.network]) {
        acc[item.network] = {};
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const byNetwork = acc[item.network]!;
      if (!byNetwork[item.comet_addr]) {
        byNetwork[item.comet_addr] = [];
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const byComet = byNetwork[item.comet_addr]!;
      byComet.push(el);
      return acc;
    }, {} as DuneCometsSpeedPeriodsV3);
  }
}
