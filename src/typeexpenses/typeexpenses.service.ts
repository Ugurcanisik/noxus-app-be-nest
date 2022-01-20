import { Injectable } from '@nestjs/common';
import { CreateTypeexpenseDto } from './dto/create-typeexpense.dto';
import { UpdateTypeexpenseDto } from './dto/update-typeexpense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Typeexpense } from './entities/typeexpense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeexpensesService {
  constructor(
    @InjectRepository(Typeexpense)
    private TypeexpenseRepository: Repository<Typeexpense>,
  ) {}

  async create(createTypeexpenseDto: CreateTypeexpenseDto) {
    const newType = await this.TypeexpenseRepository.create(
      createTypeexpenseDto,
    );
    return await this.TypeexpenseRepository.save(newType);
  }

  async findAll() {
    return await this.TypeexpenseRepository.find({
      where: { deleted: false },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string) {
    return await this.TypeexpenseRepository.findOne({
      where: { id: id, deleted: false },
    })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return false;
      });
  }

  async update(id: string, updateTypeexpenseDto: UpdateTypeexpenseDto) {
    const type = await this.findOne(id);
    if (type) {
      return await this.TypeexpenseRepository.update(id, updateTypeexpenseDto);
    }
  }

  async remove(id: string) {
    const type = await this.findOne(id);
    if (type) {
      return await this.TypeexpenseRepository.update(id, { deleted: true });
    }
  }
}
