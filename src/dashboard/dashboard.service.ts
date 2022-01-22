import { Injectable } from "@nestjs/common";
import { CiroService } from "../ciro/ciro.service";
import { ExpensesService } from "../expenses/expenses.service";

@Injectable()
export class DashboardService {
  constructor(
    private readonly ciroService: CiroService,
    private readonly expensesService: ExpensesService
  ) {
  }

  yesterdayCiro() {
    return this.ciroService.yesterdayCiro();
  }

  monthlyCiro() {
    return this.ciroService.monthlyCiro();
  }

  totalCiro() {
    return this.ciroService.totalCiro();
  }

  averageCiro() {
    return this.ciroService.averageCiro();
  }

  maxCiro() {
    return this.ciroService.maxCiro();
  }

  todayExpenses() {
    return this.expensesService.todayExpenses();
  }

  monthlyExpenses() {
    return this.expensesService.monthlyExpenses();
  }

  totalExpenses() {
    return this.expensesService.totalExpenses();
  }

  chartCiro() {
    return this.ciroService.chartCiro();
  }

  chartExpenses() {
    return this.expensesService.chartExpenses();
  }


}
