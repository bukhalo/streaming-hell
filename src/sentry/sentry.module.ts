import { Module } from '@nestjs/common';
import { SentryModule as Sentry } from '@ntegral/nestjs-sentry';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sentryConfig } from './sentry.config';

@Module({
  imports: [
    Sentry.forRootAsync({
      imports: [ConfigModule.forFeature(sentryConfig)],
      useFactory: (configService: ConfigService) => configService.get('sentry'),
      inject: [ConfigService],
    }),
  ],
})
export class SentryModule {}
