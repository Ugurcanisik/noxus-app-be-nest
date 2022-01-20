import { PartialType } from "@nestjs/mapped-types";
import { CreateStaffDto } from "./create-staff.dto";

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
}
