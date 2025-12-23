import { Module } from '@nestjs/common';
import { GithubModule } from 'github/github.module';
import { ContractModule } from 'contract/contract.module';
import { JsonModule } from 'json/json.module';
import { NetworkModule } from 'network/network.module';
import { IndexerModule } from 'indexer/indexer.module';
import { MarkdownService } from './markdown.service';
import { GenerateMarkdownCommand } from './generate-markdown.command';
import { GenerateOwesCommand } from './generate-owes.command';

@Module({
  imports: [
    GithubModule,
    ContractModule,
    JsonModule,
    NetworkModule,
    IndexerModule,
  ],
  providers: [MarkdownService, GenerateMarkdownCommand, GenerateOwesCommand],
  exports: [MarkdownService],
})
export class GenerationModule {}
