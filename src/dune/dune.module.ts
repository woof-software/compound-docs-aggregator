import { Module } from '@nestjs/common';
import { DuneService } from './dune.service';

@Module({
  providers: [DuneService],
  exports: [DuneService],
})
export class DuneModule {}
