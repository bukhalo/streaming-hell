import { Injectable } from '@nestjs/common';
import { TelegrafCommand } from 'nestjs-telegraf';
import { START_COMMAND_REPLY } from './start.constants';

@Injectable()
export class StartService {
  @TelegrafCommand('start')
  startCommand(ctx) {
    ctx.reply(START_COMMAND_REPLY);
  }
}
