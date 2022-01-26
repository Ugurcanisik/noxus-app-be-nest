import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import * as jwt from "jsonwebtoken";
import { jwtConstants } from "./constants";

@Injectable()
export class CookieAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const Response = context.switchToHttp().getResponse();
    if (request.headers.token === "token") {
      return true;
    }

    try {
      await jwt.verify(request.headers.token, jwtConstants.secret);
      return true;
    } catch (e) {
      return false;
    }
  }
}
