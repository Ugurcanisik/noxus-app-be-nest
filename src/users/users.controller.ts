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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { RolesGuard } from '../auth/auth.guard';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();

    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    return await this.usersService
      .create(createUserDto)
      .then(async (response) => {
        const token = await jwt.sign(
          {
            id: response.id,
            name: response.name,
            lastName: response.lastName,
            userName: response.userName,
            role: response.role,
          },
          jwtConstants.secret,
        );
        return await this.usersService.update(response.id, { token: token });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('password/:id')
  async updatePassword(@Param('id') id: string, @Body() payload) {
    const user = await this.usersService.findOne(id);

    const oldPassword = await bcrypt.compare(
      payload.oldPassword,
      user.password,
    );

    if (oldPassword) {
      const salt = await bcrypt.genSalt();
      payload.newPassword = await bcrypt.hash(payload.newPassword, salt);

      return await this.usersService.update(id, {
        password: payload.newPassword,
      });
    } else {
      return false;
    }
  }

  @Patch('role/:id')
  async updateRole(@Param('id') id: string, @Body() payload) {
    const user = await this.usersService.findOne(id);

    if (user) {
      await this.usersService.update(id, payload);
      const token = await jwt.sign(
        {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          userName: user.userName,
          role: payload.role,
        },
        jwtConstants.secret,
      );
      return await this.usersService.update(id, { token: token });
    } else {
      return false;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
