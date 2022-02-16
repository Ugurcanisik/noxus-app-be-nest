import { Injectable } from '@nestjs/common';
import { CiroService } from '../ciro/ciro.service';
import { ExpensesService } from '../expenses/expenses.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly CiroService: CiroService,
    private readonly ExpensesService: ExpensesService,
  ) {}

  ciroBetween(start: string, end: string) {
    return this.CiroService.ciroBetween(start, end);
  }

  expensesBetween(start: string, end: string) {
    return this.ExpensesService.expensesBetween(start, end);
  }

  typeBetween(type, start, end) {
    return this.ExpensesService.typeBetween(type, start, end);
  }
}
