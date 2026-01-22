import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubService } from './github.service';
import { PullRequestCommand } from './pull-request.command';

@Module({
  imports: [ConfigModule],
  providers: [GithubService, PullRequestCommand],
  exports: [GithubService],
})
export class GithubModule {}
