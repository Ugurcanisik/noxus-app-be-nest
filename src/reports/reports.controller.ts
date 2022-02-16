import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ReportsService } from './reports.service';
import { RolesGuard } from '../auth/auth.guard';

@UseGuards(RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async reports(@Body() payload) {
    const startDate = payload.startDate;
    const endDate = payload.endDate;
    const type = payload.type;

    let result = null;

    if (type === 'gelir') {
      result = await this.reportsService.ciroBetween(startDate, endDate);
      return result;
    } else if (type === 'gider') {
    } else if (type !== 'gelir' && type !== 'gider') {
    }
  }
}
