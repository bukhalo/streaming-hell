import { Injectable } from '@nestjs/common';
import { TelegrafOptionsFactory, TelegrafModuleOptions } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegrafConfigService implements TelegrafOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: this.configService.get('bot.token'),
    };
  }
}
