import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpotifyModule } from './spotify/spotify.module';
import { LinksModule } from './links/links.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    SpotifyModule,
    LinksModule,
  ],
})
export class AppModule {}
