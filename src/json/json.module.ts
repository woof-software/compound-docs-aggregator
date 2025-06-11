import { Module } from '@nestjs/common';
import { JsonService } from './json.service';

@Module({
  providers: [JsonService],
  exports: [JsonService],
})
export class JsonModule {}
