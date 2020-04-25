import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  app,
  telegrafModule,
  validationOptions,
  validationSchema,
} from './core/configs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { StartModule } from './start/start.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      load: [app, telegrafModule],
      validationOptions,
      validationSchema,
      isGlobal: true,
      expandVariables: true,
    }),
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('telegrafModule'),
      inject: [ConfigService],
    }),
    StartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
