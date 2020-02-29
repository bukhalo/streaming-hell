import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsAlphanumeric,
  IsLowercase,
  IsString,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, format: 'alphanumeric, lowercase' })
  @IsString()
  @IsAlphanumeric()
  @IsLowercase()
  readonly username: string;

  @ApiProperty({ required: false, format: 'email' })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ required: true, format: 'password', minLength: 8 })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
