import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health check')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  getHello(): string {
    return this.appService.getHealthCheck();
  }
}
