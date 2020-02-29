import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
// import { SpotifyModule } from './spotify/spotify.module';
import { LinksModule } from './links/links.module';
import { OdeslyModule } from '@app/odesly';

@Module({
  imports: [
    ConfigModule,
    OdeslyModule,
    // SpotifyModule,
    LinksModule,
  ],
})
export class AppModule {}
