import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../core/guards';
import { TelegramBotUser } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(of => TelegramBotUser)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => [TelegramBotUser], { name: 'telegramBotUserCollection' })
  @UseGuards(GqlAuthGuard)
  async telegramBotUserCollection(): Promise<TelegramBotUser[]> {
    return this.usersService.findAll();
  }
}
