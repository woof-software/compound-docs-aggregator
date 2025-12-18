import { Module } from '@nestjs/common';
import { NetworkModule } from 'network/network.module';
import { IndexerService } from './indexer.service';

@Module({
  imports: [NetworkModule],
  providers: [IndexerService],
  exports: [IndexerService],
})
export class IndexerModule {}
