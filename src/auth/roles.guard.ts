import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IUser } from 'src/user/interfaces/IUser';

export const Roles = (roles: string[]) => SetMetadata('TIMOS_ROLES', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const roles = this.reflector.get<string[]>(
      'TIMOS_ROLES',
      context.getHandler(),
    );

    if (!roles.length) {
      return true;
    }

    const req = ctx.getRequest() as Request;

    const user = req.user as IUser;
    return roles.some(r => {
      if (user.group?.toLowerCase().includes(r)) {
        return true;
      }
      /* if (user.permission.includes(r)) {
       return true
     } */
      return false;
    });
  }
}
