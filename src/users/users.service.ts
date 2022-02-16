import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.UserRepository.create(createUserDto);
    return await this.UserRepository.save(newUser);
  }

  async findAll() {
    return await this.UserRepository.find({
      where: {
        deleted: false,
      },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string) {
    return await this.UserRepository.findOne({
      where: { id: id, deleted: false },
    }).then((response) => {
      return response;
    });
  }

  async findByUserName(payload) {
    return await this.UserRepository.findOne({
      where: { userName: payload, deleted: false },
    })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      return await this.UserRepository.update(id, updateUserDto);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      return await this.UserRepository.update(id, { deleted: true });
    }
  }


}
