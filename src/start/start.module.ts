import { Module } from '@nestjs/common';
import { StartService } from './start.service';

@Module({
  providers: [StartService]
})
export class StartModule {}
