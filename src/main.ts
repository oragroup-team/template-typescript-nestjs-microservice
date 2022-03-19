import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from '@/app.module'
import { ConfigService } from '@/config/config.service'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const config = app.get<ConfigService>(ConfigService)

  await app.listen(config.get('port'))
}

bootstrap()
