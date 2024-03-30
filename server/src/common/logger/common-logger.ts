import { Logger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ILog } from './log.interface';

export class CommonLogger extends Logger {
  private winstonLogger: winston.Logger;

  constructor(context?: string, isTimestampEnabled?: any) {
    super(context, isTimestampEnabled);
    const winstonTransports = new winston.transports.File({
      // name: "",
      filename: '%DATE%.log',
      dirname: './logs/',
      options: {},
      maxsize: 50,
      rotationFormat: () => {},
      zippedArchive: false,
      maxFiles: 50,
      eol: "",
      tailable: false,

      // format: winston.format.combine(
      //   winston.format.timestamp(),
      //   winston.format.json(),
      // ),
    });
    this.winstonLogger = winston.createLogger({
      transports: winstonTransports,
    });
  }

  customError(message: string, trace: string, log: ILog) {
    this.winstonLogger.error(message, log);
    super.error(message, trace);
  }
}
