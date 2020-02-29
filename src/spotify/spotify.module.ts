import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import spotifyConfig from './spotify.config';
import { SpotifyService } from './spotify.service';

@Module({
  imports: [ConfigModule.forFeature(spotifyConfig)],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
