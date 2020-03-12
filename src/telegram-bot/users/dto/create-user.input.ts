import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field()
  userId: number;

  @Field()
  isBot: boolean;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  languageCode: string;
}
