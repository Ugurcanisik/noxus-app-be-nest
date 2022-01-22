import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { CreateDashboardDto } from "./dto/create-dashboard.dto";
import { UpdateDashboardDto } from "./dto/update-dashboard.dto";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {
  }

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
  }

  @Get()
  async findAll() {
    const ciro = {
      yesterday: await this.dashboardService.yesterdayCiro(),
      month: await this.dashboardService.monthlyCiro(),
      total: await this.dashboardService.totalCiro(),
      average: await this.dashboardService.averageCiro(),
      max: await this.dashboardService.maxCiro(),
      chart: await this.dashboardService.chartCiro()
    };

    const expense = {
      today: await this.dashboardService.todayExpenses(),
      month: await this.dashboardService.monthlyExpenses(),
      total: await this.dashboardService.totalExpenses(),
      chart: await this.dashboardService.chartExpenses()
    };

    return {
      ciro,
      expense
    };
  }
}
