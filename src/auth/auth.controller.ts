import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';

class AxiosResponse<T> {}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private httpService: HttpService,
  ) {}

  @Get(':token')
  async token(@Param('token') token) {
    try {
      return await jwt.verify(token, jwtConstants.secret);
    } catch (e) {
      return false;
    }
  }

  @Post('recaptcha')
  recaptcha(@Body() payload) {
    const secret = '6LcXclceAAAAAIAWcpCfeots6LjH9b4Sj1Xjrwgv';
    const recaptcha = payload.recaptcha;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptcha}`;

    return this.httpService.post(url).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  @Post()
  async auth(@Body() payload) {
    return await this.usersService
      .findByUserName(payload.userName)
      .then(async (response) => {
        if (response != undefined) {
          const decryption = await bcrypt.compare(
            payload.password,
            response.password,
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
