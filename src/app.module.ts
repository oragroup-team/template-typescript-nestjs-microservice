import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'

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
