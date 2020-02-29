import { Module } from '@nestjs/common';
import { SentryModule } from './sentry/sentry.module';
import { ConfigModule } from './config/config.module';
// import { SpotifyModule } from './spotify/spotify.module';
import { LinksModule } from './links/links.module';
import { OdeslyModule } from '@app/odesly';

@Module({
  imports: [
    SentryModule,
    ConfigModule,
    OdeslyModule,
    // SpotifyModule,
    LinksModule,
  ],
})
export class AppModule {}
