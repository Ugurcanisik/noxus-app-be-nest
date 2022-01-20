import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeexpensesService } from './typeexpenses.service';
import { CreateTypeexpenseDto } from './dto/create-typeexpense.dto';
import { UpdateTypeexpenseDto } from './dto/update-typeexpense.dto';

@Controller('typeexpenses')
export class TypeexpensesController {
  constructor(private readonly typeexpensesService: TypeexpensesService) {}

  @Post()
  create(@Body() createTypeexpenseDto: CreateTypeexpenseDto) {
    return this.typeexpensesService.create(createTypeexpenseDto);
  }

  @Get()
  findAll() {
    return this.typeexpensesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeexpenseDto: UpdateTypeexpenseDto,
  ) {
    return this.typeexpensesService.update(id, updateTypeexpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeexpensesService.remove(id);
  }
}
