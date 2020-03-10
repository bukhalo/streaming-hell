import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false, format: 'email' })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ required: true, format: 'password', minLength: 8 })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
