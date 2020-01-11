import { Field, InputType } from 'type-graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class LinksInput {
  @Field(type => String)
  url: string;

  @Field(type => String)
  @IsOptional()
  userCountry: string;

  @Field(type => String)
  @IsOptional()
  platform?: string;

  @Field(type => String)
  @IsOptional()
  type?: string;

  @Field(type => String)
  @IsOptional()
  id?: string;
}
