import { ObjectType, Field } from 'type-graphql';
import { LinksByPlatform } from './linksByPlatform.model';

@ObjectType()
export class Links {
  @Field(type => String, {
    nullable: false,
    description:
      'The unique ID for the input entity that was supplied in the request. The data for this entity, such as title, artistName, etc. will be found in an object at `nodesByUniqueId[entityUniqueId]`',
  })
  entityUniqueId: string;

  @Field(type => String, {
    nullable: false,
    description:
      "The userCountry query param that was supplied in the request. It signals the country/availability we use to query the streaming platforms. Defaults to 'US' if no userCountry supplied in the request.\n\nNOTE: As a fallback, our service may respond with matches that were found in a locale other than the userCountry supplied",
  })
  userCountry: string;

  @Field(type => String, {
    nullable: false,
    description: 'A URL that will render the Songlink page for this entity',
  })
  pageUrl: string;

  @Field(type => LinksByPlatform, {
    nullable: false,
    description: '',
  })
  linksByPlatform: LinksByPlatform;
}
