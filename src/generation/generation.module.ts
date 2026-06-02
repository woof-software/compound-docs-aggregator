import { Module } from '@nestjs/common';
import { GithubModule } from 'github/github.module';
import { ContractModule } from 'contract/contract.module';
import { JsonModule } from 'json/json.module';
import { NetworkModule } from 'network/network.module';
import { MarkdownService } from './markdown.service';
import { GenerateMarkdownCommand } from './generate-markdown.command';

@Module({
  imports: [GithubModule, ContractModule, JsonModule, NetworkModule],
  providers: [MarkdownService, GenerateMarkdownCommand],
  exports: [MarkdownService],
})
export class GenerationModule {}
