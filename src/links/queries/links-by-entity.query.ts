import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsIn,
  IsISO31661Alpha2,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PLATFORMS, ENTITY_TYPES } from '../../providers/odesli/odesli.constants';

export class LinksByEntityQuery {
  @IsNotEmpty()
  @IsIn(PLATFORMS)
  @ApiProperty({
    description: "The platform of the entity you'd like to match.",
  })
  platform: typeof PLATFORMS[number];

  @IsNotEmpty()
  @IsIn(ENTITY_TYPES)
  @ApiProperty({
    enum: ['song', 'album'],
    description: 'The type of streaming entity.',
  })
  type: typeof ENTITY_TYPES[number];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'e.g. 1443109064 which is an iTunes ID.',
    description:
      'The unique identifier of the streaming entity.',
  })
  id: string;

  @IsISO31661Alpha2()
  @IsOptional()
  @ApiProperty({
    description: 'Two-letter country code. Specifies the country/location we use when searching streaming catalogs.',
    default: 'US',
    required: false,
  })
  userCountry?: string = 'US';
}
