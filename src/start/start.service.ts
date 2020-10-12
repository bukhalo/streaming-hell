import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-telegraf';

@Injectable()
export class StartService {
  @Command('start')
  async startCommand(ctx) {
    await ctx.replyWithMarkdown(ctx.i18n.t('START_COMMAND_REPLY'));
  }
}
