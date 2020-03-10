import { Module } from '@nestjs/common';
import { SentryModule } from './sentry/sentry.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProvidersModule } from './providers/providers.module';
import { LinksModule } from './links/links.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
  imports: [
    SentryModule,
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProvidersModule,
    LinksModule,
    TelegramBotModule,
  ],
})
export class AppModule {}
