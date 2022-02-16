import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { RolesGuard } from '../auth/auth.guard';

@UseGuards(RolesGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    const newExpense = await this.expensesService.create(createExpenseDto);
    return await this.expensesService.findOne(newExpense.id);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return await this.expensesService
      .update(id, updateExpenseDto)
      .then(async () => {
        return await this.expensesService.findOne(id);
      })
      .catch((e) => {
        return e;
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
