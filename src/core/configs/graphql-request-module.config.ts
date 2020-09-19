import { registerAs } from '@nestjs/config';

export const graphqlRequestModule = registerAs('graphqlRequestModule', () => ({
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://api.streaming-hell.com/graphql'
      : 'http://localhost:3000/graphql',
}));
