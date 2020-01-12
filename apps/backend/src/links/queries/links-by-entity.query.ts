import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsIn,
  IsISO31661Alpha2,
} from 'class-validator';
import { PLATFORMS, ENTITY_TYPES } from '@app/odesly';

export class LinksByEntityQuery {
  @IsNotEmpty()
  @IsIn(PLATFORMS)
  platform: typeof PLATFORMS[number];

  @IsNotEmpty()
  @IsIn(ENTITY_TYPES)
  type: typeof ENTITY_TYPES[number];

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsISO31661Alpha2()
  @IsOptional()
  userCountry?: string = 'US';
}
