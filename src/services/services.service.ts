import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-telegraf';

@Injectable()
export class ServicesService {
  @Command('services')
  async servicesCommand(ctx) {
    await ctx.replyWithMarkdown(ctx.i18n.t('SERVICES_COMMAND_REPLY'));
  }
}
