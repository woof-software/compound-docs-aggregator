import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { IndexerService } from 'indexer/indexer.service';

@Command({ name: 'index', description: 'Index networks' })
export class IndexCommand extends CommandRunner {
  private readonly logger = new Logger(IndexCommand.name);

  constructor(private readonly indexer: IndexerService) {
    super();
  }

  async run() {
    try {
      this.logger.log('Start indexing...');
      await this.indexer.run();
      this.logger.log('Indexing completed.');
      return;
    } catch (error) {
      this.logger.error('An error occurred while generating markdown:', error);
      return;
    }
  }
}
