import { Module } from '@nestjs/common';
import { NetworkModule } from 'network/network.module';
import { ContractService } from './contract.service';
import { JsonModule } from 'json/json.module';

@Module({
  imports: [NetworkModule, JsonModule],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
