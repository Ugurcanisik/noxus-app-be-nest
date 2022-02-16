import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async qrProductsList() {
    const products = await this.appService.qrProduct();
    const category = await this.appService.qrCategory();
    return {
      products,
      category,
    };
  }
}
