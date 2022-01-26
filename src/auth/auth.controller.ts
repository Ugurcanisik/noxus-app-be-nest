import { Controller, Post, Body, Req, Get, Param } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { jwtConstants } from "./constants";

@Controller("auth")
export class AuthController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get(':token')
  async token(@Param('token') token) {
    try {
      const decoded = await jwt.verify(
        token,
        jwtConstants.secret
      );
      return decoded
    } catch (e) {
      return false;
    }
  }

  @Post()
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
}
