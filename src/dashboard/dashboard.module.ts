import { Module } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { DashboardController } from "./dashboard.controller";
import { CiroModule } from "../ciro/ciro.module";
import { ExpensesModule } from "../expenses/expenses.module";

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [CiroModule, ExpensesModule]
})
export class DashboardModule {
}
