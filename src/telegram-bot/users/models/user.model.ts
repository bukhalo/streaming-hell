import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TelegramBotUser {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  userId: string;

  @Field(type => Boolean)
  isBot: boolean;

  @Field(type => String)
  firstName: string;

  @Field(type => String, { nullable: true })
  lastName: string;

  @Field(type => String, { nullable: true })
  username: string;

  @Field(type => String, { nullable: true })
  languageCode: string;
}
