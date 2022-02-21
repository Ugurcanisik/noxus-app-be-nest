import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import 'dotenv/config';

class AxiosResponse<T> {}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private httpService: HttpService,
  ) {}

  @Get(':token')
  async token(@Param('token') token) {
    try {
      const userId = await jwt.verify(token, jwtConstants.secret);
      const user = await this.authService.findUserById(userId.id);
      return {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        userName: user.userName,
        role: user.role,
      };
    } catch (e) {
      return false;
    }
  }

  @Post('recaptcha')
  recaptcha(@Body() payload) {
    const secret = process.env.recaptcha;
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
    return await this.authService
      .findUserByUserName(payload.userName)
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
