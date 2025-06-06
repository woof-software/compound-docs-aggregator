import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import networksConfig from '../config/networks.config';
import { NetworkService } from './network.service';
import { ProviderFactory } from './provider.factory';

@Module({
  imports: [ConfigModule.forFeature(networksConfig)],
  providers: [NetworkService, ProviderFactory],
  exports: [NetworkService, ProviderFactory],
})
export class NetworkModule {}
