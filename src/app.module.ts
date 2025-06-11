import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import networksConfig from 'config/networks.config';

import { GithubModule } from 'github/github.module';
import { NetworkModule } from 'network/network.module';
import { ContractModule } from 'contract/contract.module';
import { MarkdownModule } from 'markdown/markdown.module';
import { JsonModule } from 'json/json.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [networksConfig] }),
    GithubModule,
    NetworkModule,
    ContractModule,
    JsonModule,
    MarkdownModule,
  ],
})
export class AppModule {}
