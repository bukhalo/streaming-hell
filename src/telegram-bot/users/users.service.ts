import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TelegramBotUser } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel('TelegramBotUser') private readonly userModel: Model<TelegramBotUser>) {}

  async create(createUserInput: CreateUserInput): Promise<TelegramBotUser> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findByUserId(userId: number): Promise<TelegramBotUser> {
    return await this.userModel.findOne({ userId: userId }).exec();
  }

  async findAll(): Promise<TelegramBotUser[]> {
    return await this.userModel.find().exec();
  }
}
