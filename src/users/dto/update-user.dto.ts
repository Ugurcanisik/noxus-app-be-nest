import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly name?: string;
  readonly lastname?: string;
  readonly username?: string;
  token?: string;
}
