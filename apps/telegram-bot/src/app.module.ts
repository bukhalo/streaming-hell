import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { BotModule } from './bot/bot.module';
import { sentryConfig } from './sentry.config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    SentryModule.forRootAsync({
      imports: [ConfigModule.forFeature(sentryConfig)],
      useFactory: (configService: ConfigService) => configService.get('sentry'),
      inject: [ConfigService],
    }),
    BotModule,
  ],
})
export class AppModule {}
