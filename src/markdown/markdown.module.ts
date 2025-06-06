import { Module } from '@nestjs/common';
import { GenerateMarkdownCommand } from './generate.command';
import { GithubModule } from 'github/github.module';
import { MarkdownService } from './markdown.service';
import { ContractModule } from 'contract/contract.module';
import { ExcelModule } from 'excel/excel.module';

@Module({
  imports: [GithubModule, ContractModule, ExcelModule],
  providers: [MarkdownService, GenerateMarkdownCommand],
  exports: [MarkdownService],
})
export class MarkdownModule {}
