import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@/config/config.service'

import { AppModule as WebAppModule } from '@/modules/web/app.module'

async function bootstrapWebApp() {
  const webApp = await NestFactory.create<NestExpressApplication>(WebAppModule)

  const config = webApp.get<ConfigService>(ConfigService)

  await webApp.listen(config.get('port'))
}

bootstrapWebApp()
