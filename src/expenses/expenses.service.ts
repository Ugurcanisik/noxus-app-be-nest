import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Dates } from '../dates';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { getConnection, Like, Repository } from 'typeorm';

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
    this.chartExpenses();
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

  async expensesBetween(start: string, end: string) {}

  typeBetween(type, start, end) {
    return getConnection()
      .createQueryBuilder()
      .select()
      .from(Expense, 'expense')
      .where('expense.typeexpense = :id ', { id: type })
      .andWhere('expense.date between :start and :end ', {
        start: start,
        end: end,
      })
      .andWhere('Expense.deleted = false')
      .execute();
  }

  async todayExpenses() {
    const today = await this.ExpenseRepository.find({
      select: ['total'],
      where: {
        date: Like(`${this.Date.fullDate()}%`),
        deleted: false,
      },
    });

    if (today.length > 0) {
      let todayExpense = 0;
      for (const i in today) {
        todayExpense += today[i].total;
      }
      return todayExpense;
    } else {
      return 0;
    }
  }

  async monthlyExpenses() {
    const monthly = await this.ExpenseRepository.find({
      select: ['total'],
      where: {
        date: Like(`___${this.Date.getMonthAndYear()}%`),
        deleted: false,
      },
    });

    if (monthly.length > 0) {
      let monthlyExpense = 0;
      for (const i in monthly) {
        monthlyExpense += monthly[i].total;
      }
      return monthlyExpense;
    } else {
      return 0;
    }
  }

  async totalExpenses() {
    const totalExpense = await getConnection()
      .createQueryBuilder()
      .select('SUM(total) as totalexpense')
      .from(Expense, 'expense')
      .where('expense.deleted = false')
      .execute();
    if (typeof totalExpense[0] != 'undefined') {
      return totalExpense[0]['totalexpense'];
    } else {
      return;
    }
  }

  async chartExpenses() {
    const allExpenses = await this.ExpenseRepository.find({
      where: { deleted: false, date: Like(`______${this.Date.getYear()}%`) },
      order: { date: 'ASC' },
    });

    const month = [];
    const mont = [];
    const totalExpenses = [];

    allExpenses.forEach(function (key, value) {
      const dateSplit = key.date.split('.');
      const yearDateSplit = dateSplit[2].split(' ')[0];
      if (!month.includes(dateSplit[1] + '.' + yearDateSplit)) {
        month.push(dateSplit[1] + '.' + yearDateSplit);
        mont.push(dateSplit[1]);
      }
    });

    mont.sort();
    month.sort();

    for (let index = 0; index < month.length; index++) {
      const element = month[index];
      const total = await getConnection()
        .createQueryBuilder()
        .select('SUM(total) as totalexpenses')
        .from(Expense, 'expense')
        .where('expense.date like :id', { id: `___${element}%` })
        .andWhere('Expense.deleted = false')
        .execute();
      totalExpenses.push(total[0].totalexpenses);
    }

    return { month: mont, total: totalExpenses };
  }
}
