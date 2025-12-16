import { Module } from '@nestjs/common';
import { GenerateMarkdownCommand } from './generate.command';
import { GithubModule } from 'github/github.module';
import { ContractModule } from 'contract/contract.module';
import { JsonModule } from 'json/json.module';
import { DuneModule } from 'dune/dune.module';
import { NetworkModule } from 'network/network.module';
import { MarkdownService } from './markdown.service';

@Module({
  imports: [
    GithubModule,
    ContractModule,
    JsonModule,
    DuneModule,
    NetworkModule,
  ],
  providers: [MarkdownService, GenerateMarkdownCommand],
  exports: [MarkdownService],
})
export class MarkdownModule {}
