import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(
      createUserDto.password as any,
      salt,
      10000,
      512,
      'sha512',
    ).toString('hex');
    const createdUser = new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email,
      salt,
      hash,
    });
    return await createdUser.save();
  }

  async createFromTelegram(createUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(username: string): Promise<User> {
    const data = await this.userModel.findOne({ username }).exec();
    return data;
  }

  async findByTelegramUserID(userID: number): Promise<User> {
    return await this.userModel.findOne({ 'telegram.userID': userID }).exec();
  }
}
