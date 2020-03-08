import {
  Controller,
  Request,
  Body,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    description: 'Login with username and password',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiOperation({
    description: 'Get user information',
  })
  user(@Request() req) {
    return req.user;
  }

  @Post('registration')
  @ApiOperation({
    description: 'New user registration',
  })
  registration(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
