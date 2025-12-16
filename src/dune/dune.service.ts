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
  DuneUserRow,
  DuneUsers,
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

  private async fetch<T>(
    queryId: number | string,
    limit = 0,
    offset = 0,
  ): Promise<DuneResult<T>> {
    let url = `${this.config.url}/api/v1/query/${queryId}/results`;
    if (limit) url += `?limit=${limit}&offset=${offset}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });

    if (!res.ok) {
      const text = await res.text();
      this.logger.error('Dune API error:', res.status, res.statusText);
      this.logger.error(text);
      // process.exit(1);
    }

    return res.json();
  }

  public async fetchUsers(
    version: CompoundVersion,
    limit: number,
    offset: number,
  ): Promise<DuneUsers> {
    const queryId = this.config.queries[version].users;

    // await this.update(queryId);
    const raw = await this.fetch<DuneUserRow>(queryId, limit, offset);

    return raw.result.rows.reduce((acc, item) => {
      const el = {
        rewardsAddress: item.comet_rewards_addr,
        cometAddress: item.comet_addr,
        userAddress: item.account,
      };

      if (!acc[item.network]) {
        acc[item.network] = [el];
      } else {
        acc[item.network]?.push(el);
      }

      return acc;
    }, {} as DuneUsers);
  }
}
