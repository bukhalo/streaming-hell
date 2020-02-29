import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsISO31661Alpha2,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LinksByUrlQuery {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The URL of a valid song or album from any of our supported platforms.',
  })
  url: string;

  @IsISO31661Alpha2()
  @IsOptional()
  @ApiProperty({
    description: 'Two-letter country code. Specifies the country/location we use when searching streaming catalogs.',
    default: 'US',
    required: false,
  })
  userCountry?: string = 'US';
}
