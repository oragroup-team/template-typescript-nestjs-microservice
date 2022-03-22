import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@/config/config.service'

import { AppModule as WebAppModule } from '@/modules/web/app/app.module'
import CommonOpenApi from '@/common/openapi'

async function bootstrapWebApp() {
  const app = await NestFactory.create<NestExpressApplication>(WebAppModule)

  const config = app.get<ConfigService>(ConfigService)

  //  Add Swagger
  CommonOpenApi(app)

  await app.listen(config.get('port'))
}

bootstrapWebApp()
