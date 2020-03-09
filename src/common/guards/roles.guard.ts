import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async matchRoles(roles: string[], user: any): Promise<boolean> {
    console.log(user.id);
    const foundUser = await this.usersService.findOne(user.id);
    if (foundUser.roles) {
      return roles.some((role: string) => foundUser.roles.includes(role));
    }
    return false;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return await this.matchRoles(roles, user);
  }
}
