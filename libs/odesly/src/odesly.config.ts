import { registerAs } from '@nestjs/config';

interface Config {
  apiKey: string;
  baseURL: string;
}

export const odeslyConfig = registerAs(
  'odesly',
  (): Config => ({
    apiKey: process.env.ODESLI_API_KEY,
    baseURL: 'https://api.song.link/v1-alpha.1/',
  }),
);
