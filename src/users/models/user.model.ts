import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  email: string;

  @Field(type => [String])
  roles: string[];
}
