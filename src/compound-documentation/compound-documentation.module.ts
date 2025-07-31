import { Module } from '@nestjs/common';
import { CompoundDocumentationService } from './compound-documentation.service';
import { GithubModule } from 'github/github.module';

@Module({
  providers: [CompoundDocumentationService],
  exports: [CompoundDocumentationService],
  imports: [GithubModule],
})
export class CompoundDocumentationModule {}
