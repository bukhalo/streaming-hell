import { Module } from '@nestjs/common';
import { SentryModule } from './sentry/sentry.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
// import { SpotifyModule } from './spotify/spotify.module';
import { LinksModule } from './links/links.module';
import { OdesliModule } from './odesli/odesli.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SentryModule,
    ConfigModule,
    DatabaseModule,
    OdesliModule,
    // SpotifyModule,
    LinksModule,
    TelegramBotModule,
    UsersModule,
  ],
})
export class AppModule {}
