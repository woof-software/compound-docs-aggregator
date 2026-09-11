import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { GithubService } from './github.service';
import { CompoundFoundationConfig } from 'config/compound-foundation.config';

@Command({ name: 'github:pull-request', description: 'Create pull request' })
export class PullRequestCommand extends CommandRunner {
  private readonly logger = new Logger(PullRequestCommand.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  private get compoundFoundation() {
    return this.config.getOrThrow<CompoundFoundationConfig>(
      'compoundFoundation',
    );
  }

  async run() {
    try {
      const markdown = this.compoundFoundation.markdown;
      const localFilePath = join(
        process.cwd(),
        markdown.directory,
        markdown.filename,
      );

      const pr = await this.githubService.createCompoundV3PR(localFilePath);
      if (pr) {
        this.logger.log(
          `PR created successfully: #${pr.prNumber} - ${pr.prUrl}`,
        );
      } else {
        this.logger.log('No changes detected, PR not created');
      }

      return;
    } catch (error) {
      this.logger.error(
        'Failed to create PR in docs repository:',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
