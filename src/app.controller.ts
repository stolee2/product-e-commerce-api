import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get('test')
  getHelloOne(): { name: string } {
    return { name: 'stole' };
  }

  @Get('test1')
  testEndpoint(): object {
    return this.appService.getTestEndpoint();
  }
}
