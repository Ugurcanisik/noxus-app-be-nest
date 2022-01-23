import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";
import { getConnection, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesService } from "../categories/categories.service";
import seoUrl from "../function/function";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
    private readonly CategoryService: CategoriesService
  ) {
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.ProductRepository.create(createProductDto);
    return await this.ProductRepository.save(newProduct);
  }

  async findAll(id: string) {
    return await this.ProductRepository.find({
      relations: ["category"],
      where: {
        category: id,
        deleted: false
      },
      order: { rank: "ASC" }
    });
  }

  async findOne(id: string) {
    return await this.ProductRepository.findOne({
      relations: ["category"],
      where: { id: id, deleted: false }
    })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return false;
      });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (product) {
      return await this.ProductRepository.update(id, updateProductDto);
    }
  }

  async isActive(id: string, payload: object) {
    const product = await this.findOne(id);
    if (product) {
      return await this.ProductRepository.update(id, payload);
    }
  }

  async rank(id: string, rank: number) {
    return await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set({ rank: rank })
      .where({ id: id })
      .andWhere(`(rank != ${rank} )`)
      .execute();
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (product) {
      return await this.ProductRepository.update(id, { deleted: true });
    }
  }

  findProducts(id: string) {
    return this.ProductRepository.find({
      where: { category: id, deleted: false, isActive: true },
      order: { rank: "ASC" }
    });
  }

  async ProductsQr() {
    const category = await this.CategoryService.findAll();

    const productArray = [];

    for (let i = 0; i < category.length; i++) {
      const id = category[i].id;
      const name = category[i].name;
      const products = await this.findProducts(id);


      const productPush = {
        categoryName: name,
        categorySeoUrl: seoUrl(name),
        products
      };

      productArray.push(productPush);
    }

    return productArray;
  }
}
