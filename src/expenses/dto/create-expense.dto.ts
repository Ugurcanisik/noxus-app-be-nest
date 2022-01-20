import { Typeexpense } from "../../typeexpenses/entities/typeexpense.entity";
import { Staff } from "../../staff/entities/staff.entity";

export class CreateExpenseDto {
  readonly typeexpense: Typeexpense[];
  readonly description?: string;
  readonly total: number;
  readonly staff?: Staff[];
  readonly date: string;
}
