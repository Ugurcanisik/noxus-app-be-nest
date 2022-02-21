import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Storage } from '@google-cloud/storage';
import 'dotenv/config';
import { RolesGuard } from '../auth/auth.guard';

@UseGuards(RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch('picture/:id')
  @UseInterceptors(FileInterceptor('picture'))
  updatePicture(@Param('id') id: string, @Req() req) {
    const storage = new Storage({
      keyFilename: process.env.C_FILE,
      projectId: process.env.C_PROID,
    });

    const bucket = storage.bucket(process.env.C_BUCKET);

    const { originalname, buffer } = req.file;

    const random = Math.floor(Math.random() * 100);

    const blob = bucket.file(random + originalname);

    blob.createWriteStream({ resumable: false }).end(buffer);

    const picture = {
      picture: random + originalname,
    };

    return this.productsService.update(id, picture);
  }

  @Patch('isActive/:id')
  isActive(@Param('id') id: string, @Body() payload: object) {
    return this.productsService.isActive(id, payload);
  }

  @Post('rank')
  rank(@Body() payload) {
    for (const i in payload) {
      this.productsService.rank(payload[i].id, payload[i].rank);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
