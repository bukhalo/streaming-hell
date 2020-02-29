import { registerAs } from '@nestjs/config';
import { SentryModuleOptions } from '@ntegral/nestjs-sentry';

export const sentryConfig = registerAs(
  'sentry',
  (): SentryModuleOptions => ({
    dsn: process.env.SENTRY_DSN,
    debug: true,
    environment: process.env.NODE_ENV,
    release: null,
    logLevel: 1,
  }),
);
