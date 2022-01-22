import { Injectable } from "@nestjs/common";
import { ProductsService } from "./products/products.service";

@Injectable()
export class AppService {

  constructor(private ProductsService: ProductsService) {
  }

  qrProductsList() {
    return this.ProductsService.allProductsQr();
  }
}
