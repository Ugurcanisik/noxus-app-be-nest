import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { CiroModule } from '../ciro/ciro.module';
import { ExpensesModule } from '../expenses/expenses.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [CiroModule, ExpensesModule],
})
export class ReportsModule {}
