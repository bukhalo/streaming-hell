import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({
    description: 'New user registration',
  })
  async list() {
    await this.usersService.findAll();
  }

  @Post('')
  @ApiOperation({
    description: 'New user registration',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  @ApiOperation({
    description: 'Get current user',
  })
  user(@Req() req) {
    return req.user;
  }
}
