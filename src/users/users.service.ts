import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Use } from 'nestjs-telegraf';
import { User } from './interfaces/user.interface';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUser): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByUserId(userId: number): Promise<User> {
    return await this.userModel
      .findOne({ userId: (userId as unknown) as string })
      .exec();
  }

  /**
   * Telegraf middleware for save bot users info database
   * @param ctx Telegraf context
   * @param next Telegraf next function
   */
  @Use()
  async telegrafSaveUser(ctx, next) {
    if (ctx.from.id) {
      const findedUser = await this.findByUserId(ctx.from.id);
      if (!findedUser) {
        this.create({
          userId: ctx.from.id,
          isBot: ctx.from.is_bot,
          firstName: ctx.from.first_name,
          lastName: ctx.from.last_name || null,
          username: ctx.from.username || null,
          languageCode: ctx.from.language_code || null,
        });
      }
    }
    next();
  }
}
