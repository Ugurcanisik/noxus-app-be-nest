import { PartialType } from "@nestjs/mapped-types";
import { CreateTypeexpenseDto } from "./create-typeexpense.dto";

export class UpdateTypeexpenseDto extends PartialType(CreateTypeexpenseDto) {
  readonly name: string;
}
