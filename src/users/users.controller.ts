import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ForbiddenException
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { jwtConstants } from "../auth/constants";
import { response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

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
            fullName: response.name + " " + response.lastName
          },
          jwtConstants.secret
        );
        return await this.usersService.update(response.id, { token: token });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  @Post("auth")
  async auth(@Body() payload) {
    return await this.usersService
      .findByUserName(payload.userName)
      .then(async (response) => {
        if (response != undefined) {
          const decryption = await bcrypt.compare(
            payload.password,
            response.password
          );
          if (decryption) {
            return response.token;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
