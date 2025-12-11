import { setTimeout } from 'node:timers/promises';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompoundVersion } from 'common/types/compound-version';
import {
  DuneClaimed,
  DuneClaimedRow,
  DuneCometSpeedPeriod,
  DuneCometsSpeedPeriods,
  DuneConfig,
  DuneResult,
  DuneSpeedPeriodRowV2,
  DuneSpeedPeriodRowV3,
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

  public async fetchRewardsClaimed(
    version: CompoundVersion,
  ): Promise<DuneClaimed> {
    const queryId = this.config.queries[version].claims;

    await this.update(queryId);
    const raw = await this.fetch<DuneClaimedRow>(queryId);

    return raw.result.rows.reduce((acc, item) => {
      acc[item.network] = item.total_comp_claimed;
      return acc;
    }, {} as DuneClaimed);
  }

  private rowToPeriod(
    row: DuneSpeedPeriodRowV2 | DuneSpeedPeriodRowV3,
  ): DuneCometSpeedPeriod {
    return {
      currBorrowSpeed: BigInt(row.curr_borrow_speed),
      currSupplySpeed: BigInt(row.curr_supply_speed),
      periodEndBlock: row.period_end_block,
      periodEndTime: new Date(row.period_end_time),
      periodStartBlock: row.period_start_block,
      periodStartTime: new Date(row.period_start_time),
      startingEventType: row.starting_event_type,
      startingTxHash: row.starting_tx_hash,
    };
  }

  public async fetchSpeedsPeriods(
    version: CompoundVersion,
  ): Promise<DuneCometsSpeedPeriods> {
    const queryId = this.config.queries[version].periods;

    await this.update(queryId);
    const raw = await this.fetch<DuneSpeedPeriodRowV2 & DuneSpeedPeriodRowV3>(
      queryId,
    );
    return raw.result.rows.reduce((acc, item) => {
      const period = this.rowToPeriod(item);

      if (!acc[item.network]) {
        acc[item.network] = {};
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const byNetwork = acc[item.network]!;
      const address =
        version === CompoundVersion.V2 ? item.ctoken_addr : item.comet_addr;
      if (!address)
        throw new Error(`[${version}] fetchSpeedsPeriods => bad address`);

      if (!byNetwork[address]) {
        byNetwork[address] = [];
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const byComet = byNetwork[address]!;
      byComet.push(period);
      return acc;
    }, {} as DuneCometsSpeedPeriods);
  }
}
