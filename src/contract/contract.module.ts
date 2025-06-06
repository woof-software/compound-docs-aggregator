import { Module } from '@nestjs/common';
import { NetworkModule } from 'network/network.module';
import { ContractService } from './contract.service';

@Module({
  imports: [NetworkModule],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
