import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { ConfigService } from '@/config/config.service'

import { AppModule as WebAppModule } from '@/modules/web/app/app.module'
import CommonOpenApi from '@/common/openapi'
import { LoggerWinstonService } from '@/common/logger/winston.service'

async function bootstrapWebApp() {
  const app = await NestFactory.create<NestExpressApplication>(WebAppModule, {
    bufferLogs: true, // Buffer the logs until a logger is attached
  })

  const config = app.get<ConfigService>(ConfigService)

  //  Adds logger
  app.useLogger(new LoggerWinstonService(config).createWinstonLogger())

  //  Add Versioning to API
  app.enableVersioning()

  //  Add Swagger
  CommonOpenApi(app)

  await app.listen(config.get('port'))
}

bootstrapWebApp()
