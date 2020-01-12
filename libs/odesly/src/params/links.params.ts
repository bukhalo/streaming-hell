import {
  IsString,
  IsUrl,
  IsIn,
  IsOptional,
  IsNotEmpty,
  IsISO31661Alpha2,
} from 'class-validator';
import { PLATFORMS, ENTITY_TYPES } from '../odesly.constants';

export class LinksParams {
  @IsString()
  @IsUrl()
  @IsOptional()
  url?: string;

  @IsNotEmpty()
  @IsIn(PLATFORMS)
  @IsOptional()
  platform?: typeof PLATFORMS[number];

  @IsNotEmpty()
  @IsIn(ENTITY_TYPES)
  @IsOptional()
  type?: typeof ENTITY_TYPES[number];

  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  key?: string;

  @IsISO31661Alpha2()
  @IsOptional()
  userCountry?: string = 'US';
}
