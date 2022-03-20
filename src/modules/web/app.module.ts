import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from '@/modules/web/app.controller'
import { AppService } from '@/modules/web/app.service'

import { ConfigModule } from '@/config/config.module'

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer): void {
    // Apply global middlewares
    // consumer.apply(HelmetMiddleware, SessionMiddleware).forRoutes('*')
  }
}
