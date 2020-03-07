import { Module } from '@nestjs/common';
import { ShazamModule } from './shazam/shazam.module';

@Module({
  imports: [ShazamModule]
})
export class ProvidersModule {}
