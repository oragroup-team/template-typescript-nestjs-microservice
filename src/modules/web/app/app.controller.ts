import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res({ passthrough: true }) response: Response) {
    response.status(HttpStatus.OK)
    return {
      status: 'ok',
    }
  }
}
