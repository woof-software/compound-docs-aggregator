import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import networksConfig from 'config/networks.config';
import indexerConfig from 'config/indexer.config';
import { GithubModule } from 'github/github.module';
import { NetworkModule } from 'network/network.module';
import { ContractModule } from 'contract/contract.module';
import { GenerationModule } from 'generation/generation.module';
import { JsonModule } from 'json/json.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [networksConfig, indexerConfig],
    }),
    GithubModule,
    NetworkModule,
    ContractModule,
    JsonModule,
    GenerationModule,
  ],
})
export class AppModule {}
