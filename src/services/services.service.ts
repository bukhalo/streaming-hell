import { Injectable } from '@nestjs/common';
import { TelegrafCommand } from 'nestjs-telegraf';
import { SERVICES_COMMAND_REPLY } from './services.constants';

@Injectable()
export class ServicesService {
  @TelegrafCommand('services')
  async servicesCommand(ctx) {
    await ctx.reply(SERVICES_COMMAND_REPLY);
  }
}
