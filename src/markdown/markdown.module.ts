import { Module } from '@nestjs/common';
import { GenerateMarkdownCommand } from './generate.command';
import { GithubModule } from 'github/github.module';
import { MarkdownService } from './markdown.service';
import { ContractModule } from 'contract/contract.module';
import { JsonModule } from 'json/json.module';

@Module({
  imports: [GithubModule, ContractModule, JsonModule],
  providers: [MarkdownService, GenerateMarkdownCommand],
  exports: [MarkdownService],
})
export class MarkdownModule {}
