import { Logger } from '@nestjs/common';
import { DEFAULT_ENV, ALLOWED_ENV } from '../config.constants';

const logger = new Logger('ConfigModule');
const NODE_ENV = process.env.NODE_ENV;

export function getEnvFileName(): string {
  try {
    if (!NODE_ENV) {
      return `.${DEFAULT_ENV}.env`;
    }

    if (NODE_ENV && ALLOWED_ENV.includes(NODE_ENV)) {
      return `.${NODE_ENV}.env`;
    } else {
      throw new Error();
    }
  } catch (e) {
    logger.error(
      `The "${NODE_ENV}" environment not allowed. Сheck that "NODE_ENV" environment variable is correct or add the environment to the list of allowed ones.`,
    );
    process.exit(1);
  }
}
