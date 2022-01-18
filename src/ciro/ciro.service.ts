import { Injectable } from '@nestjs/common';
import { CreateCiroDto } from './dto/create-ciro.dto';
import { UpdateCiroDto } from './dto/update-ciro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciro } from './entities/ciro.entity';
import { Like, Repository } from 'typeorm';
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
}
