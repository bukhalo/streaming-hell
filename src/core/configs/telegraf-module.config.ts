import { registerAs } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';

function launchOptions() {
  if (process.env.NODE_ENV === 'production') {
    return {
      webhook: {
        domain: 'tg-bot.streaming-hell.com',
        hookPath: '/webhook',
      },
    };
  }
  return {};
}

export const telegrafModule = registerAs(
  'telegrafModule',
  (): TelegrafModuleOptions => ({
    token: process.env.BOT_TOKEN,
    launchOptions: launchOptions(),
  }),
);
