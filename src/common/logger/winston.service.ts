import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston'
import * as winston from 'winston'
import CloudWatchTransport from 'winston-cloudwatch'
import { ConfigService } from '@/config/config.service'
import { LoggerService } from '@nestjs/common'

export class LoggerWinstonService {
  constructor(private configService: ConfigService) {
    this.configService = configService
  }
  /**
   * Creates a winston console logger
   */
  createConsoleLogger() {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    })
  }

  /**
   * Creates a cloudwatch logger
   * @returns void
   */
  createCloudwatchLogger() {
    return new CloudWatchTransport({
      name: 'Cloudwatch Logs',
      logGroupName: this.configService.get('logGroupName'),
      logStreamName: this.configService.get('logStreamName'),
      awsAccessKeyId: this.configService.get('awsAccessKeyId'),
      awsSecretKey: this.configService.get('awsSecretKey'),
      awsRegion: this.configService.get('awsRegion'),
      messageFormatter: function (item) {
        return (
          item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
        )
      },
    })
  }

  /**
   * Creates the winston logger
   */
  createWinstonLogger(): LoggerService {
    return WinstonModule.createLogger({
      format: winston.format.uncolorize(), //Uncolorize logs as weird character encoding appears when logs are colorized in cloudwatch.
      transports: [this.createConsoleLogger(), this.createCloudwatchLogger()],
    })
  }
}
