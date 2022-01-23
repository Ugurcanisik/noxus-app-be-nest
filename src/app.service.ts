import { Injectable } from "@nestjs/common";
import { ProductsService } from "./products/products.service";
import { CategoriesService } from "./categories/categories.service";

@Injectable()
export class AppService {
  constructor(
    private ProductsService: ProductsService,
    private CategoriesService: CategoriesService,
  ) {}

  qrProduct() {
    return this.ProductsService.ProductsQr();
  }

  qrCategory() {
    return this.CategoriesService.categoryQr();
  }
}
