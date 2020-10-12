import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard, TelegramAuthGuard } from './guards';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    description: 'Login with username and password',
  })
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(TelegramAuthGuard)
  @Get('telegram')
  async telegram(@Req() req: Request): Promise<any> {
    return this.authService.login(req.user);
  }
}
