import { object, string, number, ValidationOptions } from '@hapi/joi';

export const validationSchema = object({
  NODE_ENV: string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: number().default(3000),
});

export const validationOptions: ValidationOptions = {
  allowUnknown: true,
  abortEarly: true,
};
