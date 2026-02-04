import { Module } from '@nestjs/common';
import { GithubModule } from 'github/github.module';
import { ContractModule } from 'contract/contract.module';
import { JsonModule } from 'json/json.module';
import { NetworkModule } from 'network/network.module';
import { IndexerModule } from 'indexer/indexer.module';
import { MarkdownService } from './markdown.service';
import { GenerateMarkdownCommand } from './generate-markdown.command';
import { GenerateOwesV3Command } from './generate-owes-v3.command';
import { GenerateOwesV2Command } from './generate-owes-v2.command';
import { GenerateOwesMarkdown } from './generate-owes-md.command';
import { OwesExportService } from './owes-export.service';

@Module({
  imports: [
    GithubModule,
    ContractModule,
    JsonModule,
    NetworkModule,
    IndexerModule,
  ],
  providers: [
    MarkdownService,
    OwesExportService,
    GenerateMarkdownCommand,
    GenerateOwesV2Command,
    GenerateOwesV3Command,
    GenerateOwesMarkdown,
  ],
  exports: [MarkdownService],
})
export class GenerationModule {}
