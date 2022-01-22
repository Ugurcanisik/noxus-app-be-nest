import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { Category } from "../../categories/entities/category.entity";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  picture?: string;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly category: any;
}
