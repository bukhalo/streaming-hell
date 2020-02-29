import { Schema, object, number, string } from '@hapi/joi';
import { DEFAULT_ENV, ALLOWED_ENV } from './config.constants';

export const VALIDATION_SCHEMA: Schema = object({
  NODE_ENV: string()
    .valid(ALLOWED_ENV.toString())
    .default(DEFAULT_ENV),
  PORT: number().default(3000),
  MONGODB_URI: string().required(),
  ODESLI_API_KEY: string().required(),
});
