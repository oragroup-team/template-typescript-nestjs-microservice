import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'

export default (app: NestExpressApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Template Swagger')
    .setDescription('The Template API description')
    .setVersion('1')
    .addTag('Template')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
}
