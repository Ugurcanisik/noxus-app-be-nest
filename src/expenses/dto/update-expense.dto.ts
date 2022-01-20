import { PartialType } from "@nestjs/mapped-types";
import { CreateExpenseDto } from "./create-expense.dto";
import { Staff } from "../../staff/entities/staff.entity";

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  readonly typeExpense: string;
  readonly description?: string;
  readonly total: number;
  readonly staff?: Staff[];
  readonly date: string;
}
