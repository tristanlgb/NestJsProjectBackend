import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

// Initialize custom logging levels and colors
const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'yellow',
    warning: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'white',
  },
};

winston.addColors(customLevelOptions.colors);

let logger: winston.Logger;
const environment = process.env.ENVIRONMENT || 'default';

// Setup logger based on environment
switch (environment) {
  case 'development':
    logger = winston.createLogger({
      levels: customLevelOptions.levels,
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
    break;

  case 'production':
    logger = winston.createLogger({
      levels: customLevelOptions.levels,
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: './errors.log',
          level: 'error',
          format: winston.format.simple(),
        }),
      ],
    });
    break;

  default:
    logger = winston.createLogger({
      levels: customLevelOptions.levels,
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: './errors.log',
          level: 'error',
          format: winston.format.simple(),
        }),
      ],
    });
    break;
}

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: string) {
    logger.info(message);
  }

  error(message: string, trace?: string) {
    logger.error(message, trace);
  }

  warn(message: string) {
    logger.warning(message);
  }

  debug(message: string) {
    logger.debug(message);
  }

  verbose(message: string) {
    logger.http(message);
  }
}

export { logger };