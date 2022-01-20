import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Dates } from '../dates';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Like, Repository } from "typeorm";

@Injectable()
export class ExpensesService {
  Date = new Dates();

  constructor(
    @InjectRepository(Expense) private ExpenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const newExpense = await this.ExpenseRepository.create(createExpenseDto);
    return await this.ExpenseRepository.save(newExpense);
  }

  async findAll() {
    return await this.ExpenseRepository.find({
      relations: ['typeexpense', 'staff'],
      where: {
        date: Like(`___${this.Date.getMonthAndYear()}%`),
        deleted: false,
      },
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string) {
    return await this.ExpenseRepository.findOne({
      relations: ['typeexpense', 'staff'],
      where: { id: id, deleted: false },
    })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return false;
      });
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findOne(id);
    if (expense) {
      return await this.ExpenseRepository.update(id, updateExpenseDto);
    }
  }

  async remove(id: string) {
    const expense = await this.findOne(id);
    if (expense) {
      return await this.ExpenseRepository.update(id, { deleted: true });
    }
  }
}
