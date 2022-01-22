import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Storage } from "@google-cloud/storage";
import "dotenv/config";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor("picture"))
  create(@Body() createProductDto: CreateProductDto, @Req() req) {
    if (req.file != undefined) {

      const storage = new Storage({
        keyFilename: process.env.C_FILE,
        projectId: process.env.C_PROID
      });

      const bucket = storage.bucket(process.env.C_BUCKET);

      const { originalname, buffer } = req.file;

      const random = Math.floor(Math.random() * 100);

      const blob = bucket.file(random + originalname);

      blob.createWriteStream({ resumable: false }).end(buffer);

      createProductDto.picture = random + originalname;
    }

    const addProduct = JSON.parse(JSON.stringify(createProductDto));
    return this.productsService.create(addProduct);
  }

  @Get(":id")
  findAll(@Param("id") id: string) {
    return this.productsService.findAll(id);
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("picture"))
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req
  ) {
    if (req.file != undefined) {

      const storage = new Storage({
        keyFilename: process.env.C_FILE,
        projectId: process.env.C_PROID
      });

      const bucket = storage.bucket(process.env.C_BUCKET);

      const { originalname, buffer } = req.file;

      const random = Math.floor(Math.random() * 100);

      const blob = bucket.file(random + originalname);

      blob.createWriteStream({ resumable: false }).end(buffer);

      updateProductDto.picture = random + originalname;
    }

    const updateProduct = JSON.parse(JSON.stringify(updateProductDto));
    return this.productsService.update(id, updateProduct);
  }

  @Patch("isActive/:id")
  isActive(@Param("id") id: string, @Body() payload: object) {
    return this.productsService.isActive(id, payload);
  }

  @Post("rank")
  rank(@Body() payload) {
    for (const i in payload) {
      this.productsService.rank(payload[i].id, payload[i].rank);
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }
}
