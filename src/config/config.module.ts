import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { VALIDATION_SCHEMA } from './env-validation.schema';
import { VALIDATION_OPTIONS } from './env-validation.options';

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      validationSchema: VALIDATION_SCHEMA,
      validationOptions: VALIDATION_OPTIONS,
      expandVariables: true,
    }),
  ],
})
export class ConfigModule {}
