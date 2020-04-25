import { HttpModule, Module } from '@nestjs/common';
import { ShazamService } from './shazam.service';

@Module({
  imports: [HttpModule],
  providers: [ShazamService],
  exports: [ShazamService],
})
export class ShazamModule {}
