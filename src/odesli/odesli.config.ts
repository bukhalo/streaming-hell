import { registerAs } from '@nestjs/config';

interface Config {
  apiKey: string;
  baseURL: string;
}

export const odesliConfig = registerAs(
  'odesli',
  (): Config => ({
    apiKey: process.env.ODESLI_API_KEY,
    baseURL: 'https://api.song.link/v1-alpha.1/',
  }),
);
