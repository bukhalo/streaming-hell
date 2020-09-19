import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['ID'];
  roles: Array<Scalars['String']>;
};

export type Entity = {
  __typename?: 'Entity';
  /** This is the unique identifier on the streaming platform/API provider */
  id: Scalars['ID'];
  type: EntityType;
  title?: Maybe<Scalars['String']>;
  artistName?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  thumbnailWidth?: Maybe<Scalars['Int']>;
  thumbnailHeight?: Maybe<Scalars['Int']>;
  /** The API provider that powered this match. Useful if you'd like to use this entity's data to query the API directly */
  apiProvider: ApiProvider;
  /** An array of platforms that are "powered" by this entity. E.g. an entity from Apple Music will generally have a `platforms` array of `["appleMusic", "itunes"]` since both those platforms/links are derived from this single entity */
  platforms: Array<Platform>;
};

export enum EntityType {
  Song = 'SONG',
  Album = 'ALBUM'
}

export enum ApiProvider {
  Spotify = 'SPOTIFY',
  Itunes = 'ITUNES',
  Youtube = 'YOUTUBE',
  Google = 'GOOGLE',
  Pandora = 'PANDORA',
  Deezer = 'DEEZER',
  Tidal = 'TIDAL',
  Amazon = 'AMAZON',
  Soundcloud = 'SOUNDCLOUD',
  Napster = 'NAPSTER',
  Yandex = 'YANDEX',
  Spinrilla = 'SPINRILLA',
  Vk = 'VK'
}

export enum Platform {
  Spotify = 'SPOTIFY',
  Itunes = 'ITUNES',
  AppleMusic = 'APPLE_MUSIC',
  Youtube = 'YOUTUBE',
  YoutubeMusic = 'YOUTUBE_MUSIC',
  Google = 'GOOGLE',
  GoogleStore = 'GOOGLE_STORE',
  Pandora = 'PANDORA',
  Deezer = 'DEEZER',
  Tidal = 'TIDAL',
  AmazonStore = 'AMAZON_STORE',
  AmazonMusic = 'AMAZON_MUSIC',
  Soundcloud = 'SOUNDCLOUD',
  Napster = 'NAPSTER',
  Yandex = 'YANDEX',
  Spinrilla = 'SPINRILLA',
  Vk = 'VK',
  Boom = 'BOOM'
}

export type Link = {
  __typename?: 'Link';
  /** Platform that are "powered" by this entity. */
  platform: Platform;
  /** The URL for this match */
  url: Scalars['String'];
  /** The native app URI that can be used on mobile devices to open this entity directly in the native app */
  nativeAppUriMobile?: Maybe<Scalars['String']>;
  /** The native app URI that can be used on desktop devices to open this entity directly in the native app */
  nativeAppUriDesktop?: Maybe<Scalars['String']>;
  entity: Entity;
};

export type LinksByUrl = {
  __typename?: 'LinksByUrl';
  /** Specifies the country/location we use when searching streaming catalogs */
  userCountry: Scalars['String'];
  /** A URL that will render the Streaming Hell page for this entity */
  pageUrl: Scalars['String'];
  entity: Entity;
  links: Array<Link>;
};

export type Query = {
  __typename?: 'Query';
  userCollection: Array<User>;
  /** Fetch the matching links for a given streaming entity. */
  linksByUrl: LinksByUrl;
};


export type QueryLinksByUrlArgs = {
  userCountry?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Entity: ResolverTypeWrapper<Entity>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  EntityType: EntityType;
  ApiProvider: ApiProvider;
  Platform: Platform;
  Link: ResolverTypeWrapper<Link>;
  LinksByUrl: ResolverTypeWrapper<LinksByUrl>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Entity: Entity;
  Int: Scalars['Int'];
  Link: Link;
  LinksByUrl: LinksByUrl;
  Query: {};
  Boolean: Scalars['Boolean'];
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type EntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entity'] = ResolversParentTypes['Entity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EntityType'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  artistName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnailUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnailWidth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thumbnailHeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  apiProvider?: Resolver<ResolversTypes['ApiProvider'], ParentType, ContextType>;
  platforms?: Resolver<Array<ResolversTypes['Platform']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
  platform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nativeAppUriMobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nativeAppUriDesktop?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LinksByUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinksByUrl'] = ResolversParentTypes['LinksByUrl']> = {
  userCountry?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>;
  links?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  userCollection?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  linksByUrl?: Resolver<ResolversTypes['LinksByUrl'], ParentType, ContextType, RequireFields<QueryLinksByUrlArgs, 'userCountry' | 'url'>>;
};

export type Resolvers<ContextType = any> = {
  User?: UserResolvers<ContextType>;
  Entity?: EntityResolvers<ContextType>;
  Link?: LinkResolvers<ContextType>;
  LinksByUrl?: LinksByUrlResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
