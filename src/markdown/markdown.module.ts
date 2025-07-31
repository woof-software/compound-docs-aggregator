import { Module } from '@nestjs/common';
import { GenerateMarkdownCommand } from './generate.command';
import { GithubModule } from 'github/github.module';
import { MarkdownService } from './markdown.service';
import { ContractModule } from 'contract/contract.module';
import { JsonModule } from 'json/json.module';
import { CompoundDocumentationModule } from 'compound-documentation/compound-documentation.module';

@Module({
  imports: [
    GithubModule,
    ContractModule,
    JsonModule,
    CompoundDocumentationModule,
  ],
  providers: [MarkdownService, GenerateMarkdownCommand],
  exports: [MarkdownService],
})
export class MarkdownModule {}
