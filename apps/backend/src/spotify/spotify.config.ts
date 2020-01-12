import { registerAs } from '@nestjs/config';

interface Config {
  clientId: string;
  clientSecret: string;
}

export default registerAs(
  'spotify',
  (): Config => ({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  }),
);
