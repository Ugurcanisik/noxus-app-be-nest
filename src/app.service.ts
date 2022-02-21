import { Injectable } from '@nestjs/common';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { SettingsService } from './settings/settings.service';

@Injectable()
export class AppService {
  constructor(
    private ProductsService: ProductsService,
    private CategoriesService: CategoriesService,
    private SettingsService: SettingsService,
  ) {}

  qrProduct() {
    return this.ProductsService.ProductsQr();
  }

  qrCategory() {
    return this.CategoriesService.categoryQr();
  }

  settings() {
    return this.SettingsService.findAll();
  }
}
