import { Injectable } from '@nestjs/common';
import { CreateCiroDto } from './dto/create-ciro.dto';
import { UpdateCiroDto } from './dto/update-ciro.dto';

@Injectable()
export class CiroService {
  create(createCiroDto: CreateCiroDto) {
    return 'This action adds a new ciro';
  }

  findAll() {
    return `This action returns all ciro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ciro`;
  }

  update(id: number, updateCiroDto: UpdateCiroDto) {
    return `This action updates a #${id} ciro`;
  }

  remove(id: number) {
    return `This action removes a #${id} ciro`;
  }
}
