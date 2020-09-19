import { object, string, number, ValidationOptions } from '@hapi/joi';

export const validationSchema = object({
  NODE_ENV: string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: number(),
  BOT_TOKEN: string().required(),
  MONGODB_URI: string().required(),
});

export const validationOptions: ValidationOptions = {
  allowUnknown: true,
  abortEarly: true,
};
