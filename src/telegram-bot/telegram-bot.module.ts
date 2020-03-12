import { Module, OnModuleInit, HttpModule, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule, TelegrafService } from 'nestjs-telegraf';
import botConfig from './telegram-bot.config';
import { TelegrafConfigService } from './telegraf-config.service';
import { TelegramBotService } from './telegram-bot.service';
import { OdesliModule } from '../providers/odesli/odesli.module';
import { ShazamModule } from '../providers/shazam/shazam.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forFeature(botConfig),
    TelegrafModule.fromFactory({
      imports: [ConfigModule.forFeature(botConfig)],
      useClass: TelegrafConfigService,
    }),
    OdesliModule,
    ShazamModule,
    UsersModule,
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly telegrafService: TelegrafService,
  ) {}

  logger = new Logger('Bot');

  onModuleInit() {
    this.telegrafService.init(this.moduleRef);
    this.telegrafService.bot.catch((err, ctx) => {
      Logger.error(`Ooops, encountered an error for ${ctx.updateType}`, err);
    });
    this.telegrafService.startPolling();
  }
}
