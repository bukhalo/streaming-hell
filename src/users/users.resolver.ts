import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../common/guards/graphql-auth.guard';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => [User], { name: 'userCollection' })
  @UseGuards(GqlAuthGuard)
  async userCollection(): Promise<User[]> {
    // @ts-ignore
    return this.usersService.findAll();
  }
}
