import { Injectable } from '@nestjs/common';
import { CreateCiroDto } from './dto/create-ciro.dto';
import { UpdateCiroDto } from './dto/update-ciro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciro } from './entities/ciro.entity';
import { Between, getConnection, Like, Repository } from 'typeorm';
import { Dates } from '../dates';

@Injectable()
export class CiroService {
  Date = new Dates();

  constructor(
    @InjectRepository(Ciro) private CiroRepository: Repository<Ciro>,
  ) {}

  async create(createCiroDto: CreateCiroDto) {
    const newCiro = await this.CiroRepository.create(createCiroDto);
    return await this.CiroRepository.save(newCiro);
  }

  async findAll() {
    return await this.CiroRepository.find({
      where: {
        date: Like(`___${this.Date.getMonthAndYear()}%`),
        deleted: false,
      },
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string) {
    return await this.CiroRepository.findOne({
      where: { id: id, deleted: false },
    })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return false;
      });
  }

  async update(id: string, updateCiroDto: UpdateCiroDto) {
    const ciro = await this.findOne(id);
    if (ciro) {
      return await this.CiroRepository.update(id, updateCiroDto);
    }
  }

  async remove(id: string) {
    const ciro = await this.findOne(id);
    if (ciro) {
      return await this.CiroRepository.update(id, { deleted: true });
    }
  }

  async ciroBetween(start: string, end: string) {
    return await this.CiroRepository.find({
      where: {
        date: Between(end, start),
        deleted: false,
      },
    });
  }

  async yesterdayCiro() {
    const yesterdayCiro = await this.CiroRepository.findOne({
      where: {
        date: Like(`${this.Date.yesterDay()}%`),
        deleted: false,
      },
    });

    if (yesterdayCiro !== undefined) {
      return yesterdayCiro.total;
    } else {
      return 0;
    }
  }

  async monthlyCiro() {
    const ciro = await this.CiroRepository.find({
      select: ['total'],
      where: {
        date: Like(`___${this.Date.getMonthAndYear()}%`),
        deleted: false,
      },
    });

    if (ciro.length > 0) {
      let monthCiro = 0;
      for (const i in ciro) {
        monthCiro += ciro[i].total;
      }

      return monthCiro;
    } else {
      return 0;
    }
  }

  async totalCiro() {
    const totalCiro = await getConnection()
      .createQueryBuilder()
      .select('SUM(total) as totalciro')
      .from(Ciro, 'ciro')
      .where('ciro.deleted = false')
      .execute();
    if (typeof totalCiro[0] != 'undefined') {
      return totalCiro[0]['totalciro'];
    } else {
      return;
    }
  }

  async averageCiro() {
    const totalCiro = await this.monthlyCiro();
    return Math.round(totalCiro / (this.Date.getSingleDay() - 1));
  }

  async maxCiro() {
    const maxCiro = await getConnection()
      .createQueryBuilder()
      .select('MAX(total) as maxciro')
      .from(Ciro, 'ciro')
      .where('ciro.deleted = false')
      .execute();
    if (typeof maxCiro[0] != 'undefined') {
      return maxCiro[0]['maxciro'];
    } else {
      return;
    }
  }

  async chartCiro() {
    const allCiro = await this.CiroRepository.find({
      where: {
        date: Like(`%${this.Date.getYear()}`),
        deleted: false,
      },
      order: { date: 'ASC' },
    });

    const month = [];
    let mont = [];
    let totalCiro = [];

    allCiro.forEach(function (key, value) {
      const datesplit = key.date.split('.');
      if (!month.includes(datesplit[1] + '.' + datesplit[2])) {
        month.push(datesplit[1] + '.' + datesplit[2]);
        mont.push(datesplit[1]);
      }
    });

    mont.sort();
    month.sort();

    for (let index = 0; index < month.length; index++) {
      const element = month[index];
      const total = await getConnection()
        .createQueryBuilder()
        .select('SUM(total) as totalciro')
        .from(Ciro, 'ciro')
        .where('ciro.date like :id', { id: `%${element}` })
        .andWhere('ciro.deleted = false')
        .execute();
      totalCiro.push(total[0].totalciro);
    }

    return { month: mont, total: totalCiro };
  }
}
