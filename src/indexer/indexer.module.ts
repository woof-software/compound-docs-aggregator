import { Module } from '@nestjs/common';
import { NetworkModule } from 'network/network.module';
import { IndexerService } from './indexer.service';
import { RuntimeDbService } from './runtime-db.service';
import { ManifestsService } from './manifests.service';
import { ChunksService } from './chunks.service';

@Module({
  imports: [NetworkModule],
  providers: [
    IndexerService,
    ManifestsService,
    ChunksService,
    RuntimeDbService,
  ],
  exports: [IndexerService, RuntimeDbService],
})
export class IndexerModule {}
