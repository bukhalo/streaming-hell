import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsISO31661Alpha2,
} from 'class-validator';

export class LinksByUrlQuery {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsISO31661Alpha2()
  @IsOptional()
  userCountry?: string = 'US';
}
