import { Platform } from '../core/types/graphql';

export enum PlatformDictionary {
  SPOTIFY = 'Spotify',
  ITUNES = 'iTunes',
  APPLE_MUSIC = 'Apple Music',
  YOUTUBE = 'YouTube',
  YOUTUBE_MUSIC = 'YouTube Music',
  GOOGLE = 'Google Play Music',
  GOOGLE_STORE = 'Google Play Music Store',
  PANDORA = 'Pandora',
  DEEZER = 'Deezer',
  TIDAL = 'Tidal',
  AMAZON_STORE = 'Amazon Music Store',
  AMAZON_MUSIC = 'Amazon Music',
  SOUNDCLOUD = 'SoundCloud',
  NAPSTER = 'Napster',
  YANDEX = 'Яндекс.Музыка',
  SPINRILLA = 'Spinrilla',
  VK = 'VK',
  BOOM = 'BOOM',
}

export const BUY_PLATFORMS = [Platform.Itunes, Platform.GoogleStore, Platform.AmazonStore];
