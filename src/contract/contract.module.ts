import { Module } from '@nestjs/common';
import { NetworkModule } from 'network/network.module';
import { JsonModule } from 'json/json.module';
import { ContractService } from './contract.service';

@Module({
  imports: [NetworkModule, JsonModule],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
