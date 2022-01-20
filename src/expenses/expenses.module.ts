import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "../orm.config";
import { Expense } from "./entities/expense.entity";

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Expense])],
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule {}
