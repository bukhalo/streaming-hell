import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegrafModule } from 'nestjs-telegraf';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LinksModule } from './links/links.module';
import { StartModule } from './start/start.module';
import { ServicesModule } from './services/services.module';

import {
  app,
  sentryModule,
  graphQLModule,
  mongooseModule,
  telegrafModule,
  validationOptions,
  validationSchema,
} from './core/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, sentryModule, graphQLModule, mongooseModule, telegrafModule],
      validationOptions,
      validationSchema,
      isGlobal: true,
      expandVariables: true,
    }),
    SentryModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('sentryModule'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('graphQLModule'),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('mongooseModule'),
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('telegrafModule'),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    LinksModule,
    StartModule,
    ServicesModule,
  ],
})
export class AppModule {}
