import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';
import { UsersService } from '../users/users.service';
import { Login } from './interfaces/login.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  validatePassword(password: string, salt: string, hash: string): boolean {
    return (
      hash === pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    );
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && this.validatePassword(password, user.salt, user.hash)) {
      return {
        // @ts-ignore
        id: user.id,
        // username: user.username,
        email: user.email,
      };
    }
    return null;
  }

  async login(user: any): Promise<Login> {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
