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
      // username: createUserDto.username,
      email: createUserDto.email,
      salt,
      hash,
    });
    return await createdUser.save();
  }

  async findOne(id: string): Promise<User> {
    const data = await this.userModel.findOne({ _id: id }).exec();
    return data;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
