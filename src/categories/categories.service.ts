import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from "typeorm";
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.CategoryRepository.create(createCategoryDto);
    return await this.CategoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.CategoryRepository.find({
      where: { deleted: false },
      order: { rank: 'ASC' },
    });
  }

  async findOne(id: string) {
    return await this.CategoryRepository.findOne({
      where: { id: id, deleted: false },
    })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return false;
      });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (category) {
      return await this.CategoryRepository.update(id, updateCategoryDto);
    }
  }

  async isActive(id: string, payload: object) {
    const category = await this.findOne(id);
    if (category) {
      return await this.CategoryRepository.update(id, payload);
    }
  }

  async rank(id: string, rank: number) {
    return await getConnection()
      .createQueryBuilder()
      .update(Category)
      .set({ rank: rank })
      .where({ id: id })
      .andWhere(`(rank != ${rank} )`)
      .execute();
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    if (category) {
      return await this.CategoryRepository.update(id, { deleted: true });
    }
  }
}
