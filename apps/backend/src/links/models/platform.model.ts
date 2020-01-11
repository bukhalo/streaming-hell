import { ObjectType, Field } from 'type-graphql';

@ObjectType({
  description:
    'Each key in `linksByPlatform` is a Platform. A Platform will exist here only if there is a match found. E.g. if there is no YouTube match found, then neither `youtube` or `youtubeMusic` properties will exist here',
})
export class Platform {
  @Field(type => String, {
    nullable: false,
    description:
      'The unique ID for this entity. Use it to look up data about this entity at `entitiesByUniqueId[entityUniqueId]`',
  })
  entityUniqueId: string;

  @Field(type => String, {
    nullable: false,
    description: 'The URL for this match',
  })
  url: string;

  @Field(type => String, {
    nullable: true,
    description:
      'The native app URI that can be used on mobile devices to open this entity directly in the native app',
  })
  nativeAppUriMobile?: string;

  @Field(type => String, {
    nullable: true,
    description:
      'The native app URI that can be used on desktop devices to open this entity directly in the native app',
  })
  nativeAppUriDesktop?: string;
}
