import { Module } from '@nestjs/common';
import { OdesliModule } from './odesli/odesli.module';
import { ShazamModule } from './shazam/shazam.module';
// import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [
    OdesliModule,
    ShazamModule,
    // SpotifyModule
  ],
})
export class ProvidersModule {}
