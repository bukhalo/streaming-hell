import { registerEnumType } from '@nestjs/graphql';

export enum Platform {
  SPOTIFY = 'spotify',
  ITUNES = 'itunes',
  APPLE_MUSIC = 'appleMusic',
  YOUTUBE = 'youtube',
  YOUTUBE_MUSIC = 'youtubeMusic',
  GOOGLE = 'google',
  GOOGLE_STORE = 'googleStore',
  PANDORA = 'pandora',
  DEEZER = 'deezer',
  TIDAL = 'tidal',
  AMAZON_STORE = 'amazonStore',
  AMAZON_MUSIC = 'amazonMusic',
  SOUNDCLOUD = 'soundcloud',
  NAPSTER = 'napster',
  YANDEX = 'yandex',
  SPINRILLA = 'spinrilla',
  VK = 'vk',
  BOOM = 'boom',
}

registerEnumType(Platform, {
  name: 'Platform',
});
