import { registerAs } from '@nestjs/config';

interface Config {
  token: string;
}

export default registerAs(
  'telegramBot',
  (): Config => ({
    token: process.env.TELEGRAM_BOT_TOKEN,
  }),
);
