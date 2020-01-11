import { ObjectType, Field } from 'type-graphql';
import { Platform } from './platform.model';

@ObjectType({
  description:
    'Each key in `linksByPlatform` is a Platform. A Platform will exist here only if there is a match found. E.g. if there is no YouTube match found, then neither `youtube` or `youtubeMusic` properties will exist here',
})
export class LinksByPlatform {
  @Field(type => Platform, {
    nullable: true,
  })
  spotify: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  itunes: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  appleMusic: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  youtube: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  youtubeMusic: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  google: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  googleStore: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  pandora: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  deezer: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  tidal: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  amazonStore: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  amazonMusic: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  soundcloud: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  napster: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  yandex: Platform;

  @Field(type => Platform, {
    nullable: true,
  })
  spinrilla: Platform;
}
