import { Module } from '@nestjs/common';
import { NetworkModule } from 'network/network.module';
import { JsonModule } from 'json/json.module';
import { ContractService } from './contract.service';
import { RewardsService } from './rewards.service';

@Module({
  imports: [NetworkModule, JsonModule],
  providers: [ContractService, RewardsService],
  exports: [ContractService, RewardsService],
})
export class ContractModule {}
