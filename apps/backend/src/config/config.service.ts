import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),

      // Songlink
      SONGLINK_API_ENDPOINT: Joi.string()
        .uri()
        .required(),
      SONGLINK_API_VERISON: Joi.string().required(),
      SONGLINK_API_KEY: Joi.string()
        .length(36)
        .required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get songlinkApiUrl() {
    return String(
      this.envConfig.SONGLINK_API_ENDPOINT +
        this.envConfig.SONGLINK_API_VERISON,
    );
  }

  get songlinkApiKey() {
    return String(this.envConfig.SONGLINK_API_KEY);
  }
}
