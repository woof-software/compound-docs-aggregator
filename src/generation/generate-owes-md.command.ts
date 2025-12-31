import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { ConfigService } from '@nestjs/config';
import { JsonService } from 'json/json.service';
import { CompoundVersion } from 'common/types/compound-version';
import { MarkdownService } from './markdown.service';
import { NetworkConfig } from '../network/network.types';
import { RewardsService } from '../contract/rewards.service';

@Command({ name: 'owes:generate:md', description: 'Generate owes markdown' })
export class GenerateOwesMarkdown extends CommandRunner {
  private readonly logger = new Logger(GenerateOwesMarkdown.name);

  constructor(
    private readonly rewards: RewardsService,
    private readonly json: JsonService,
    private readonly markdown: MarkdownService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  private get networksListV2() {
    return this.config
      .getOrThrow<NetworkConfig[]>('networks')
      .filter((n) => n.comptrollerV2 && n.comp);
  }

  private async v2At() {
    return Promise.all(
      this.networksListV2.map(async (network) =>
        this.rewards.getRewardsAtContractV2({
          network: network.network,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          comptroller: network.comptrollerV2!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          comp: network.comp!,
        }),
      ),
    );
  }

  async run() {
    try {
      this.logger.log('Generating owes markdown...');
      const owesV2 = this.json.readOwes(CompoundVersion.V2);
      const owesV3 = this.json.readOwes(CompoundVersion.V3);

      this.json.writeOwes(owesV2, CompoundVersion.V2);
      const nestedMarketsV3 = this.json.readMarkets();
      const v2At = await this.v2At();

      this.markdown.writeRewardsMd({ owesV2, owesV3, nestedMarketsV3, v2At });

      this.logger.log('Generating of owes markdown completed.');
      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }
}
