import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/services/users.service';
import { PERMISSIONS } from '../constants/permissions.constant';
import { Permissions } from '../enums/permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userId = context.switchToHttp().getRequest<Request>().headers[
      'x-user-id'
    ];

    const permission = this.reflector.get<Permissions>(
      PERMISSIONS,
      context.getHandler(),
    );

    return this.varifyPermissions(userId as string, permission);
  }

  varifyPermissions(id: string, permission: Permissions): boolean {
    const user = this.usersService.findOne(id);

    if (user?.permissions?.includes(Permissions.ALL)) {
      return true;
    } else {
      return user?.permissions?.includes(permission);
    }
  }
}
