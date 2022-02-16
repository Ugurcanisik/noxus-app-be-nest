import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const Response = context.switchToHttp().getResponse();

    try {
      const decoded = await jwt.verify(
        request.headers.token,
        jwtConstants.secret,
      );

      switch (request.url.split('/')[1]) {
        case 'dashboard':
          return true;
          break;
        case 'ciro':
          const ciroRole = decoded.role.ciro;
          if (ciroRole) {
            return true;
          } else {
            return false;
          }
          break;
        case 'categories':
          const categoryRole = decoded.role.categories;
          if (categoryRole) {
            return true;
          } else {
            return false;
          }
          break;
        case 'expenses':
          const expensesRole = decoded.role.expenses;
          if (expensesRole) {
            return true;
          } else {
            return false;
          }
          break;
        case 'products':
          const productsRole = decoded.role.products;
          if (productsRole) {
            return true;
          } else {
            return false;
          }
          break;
        case 'reports':
          const reportsRole = decoded.role.reports;
          if (reportsRole) {
            return true;
          } else {
            return false;
          }
          break;
        case 'settings':
          const settingsRole = decoded.role.settings;
          if (settingsRole) {
            return true;
          } else {
            return false;
          }
          break;
        case 'staff':
          const staffRole = decoded.role.staff;
          if (staffRole) {
            return true;
          } else {
            return false;
          }
          break;
        case 'typeexpenses':
          const typeexpensesRole = decoded.role.typeexpenses;
          if (typeexpensesRole) {
            return true;
          } else {
            return false;
          }
          break;
        case 'users':
          const usersRole = decoded.role.users;
          if (usersRole) {
            return true;
          } else {
            return false;
          }
          break;
      }
    } catch (e) {
      return false;
    }
  }
}
