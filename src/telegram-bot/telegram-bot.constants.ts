export const START_COMMAND_REPLY =
  '👋 Привет!\n\n' +
  'Моя основная функция – искать музыку во всех (почти) стриминогвых сервисах.\n\n' +
  'Отправь мне ссылку или несколько ссылок на трек или альбом из любого стримингового сервиса, а в ответ я пришлю ссылки на другие сервисы, где я нашёл твой трек или альбом.\n\n' +
  'Список поддерживаемых на данный момент сервисов можно получить командой /services';

export const SERVICES_COMMAND_REPLY =
  'На текущий момент бот поддерживает следующие сервисы:\n\n' +
  'Apple Music\n' +
  'Amazon Music\n' +
  'Amazon Store\n' +
  'Deezer\n' +
  'Google Music\n' +
  'Google Play\n' +
  'iTunes\n' +
  'Napster\n' +
  'Pandora\n' +
  'SoundCloud\n' +
  'Spinrilla\n' +
  'Spotify\n' +
  'Shazam\n' +
  'Tidal\n' +
  'Yandex.Music\n' +
  'YouTube\n' +
  'YouTube Music\n';

export const PROVIDERS_DICTIONARY = {
  amazonMusic: 'Amazon Music',
  amazonStore: 'Amazon Music Store',
  appleMusic: 'Apple Music',
  deezer: 'Deezer',
  google: 'Google Play Music',
  googleStore: 'Google Play Music Store',
  itunes: 'iTunes',
  napster: 'Napster',
  pandora: 'Pandora',
  spinrilla: 'Spinrilla',
  soundcloud: 'SoundCloud',
  spotify: 'Spotify',
  tidal: 'Tidal',
  yandex: 'Яндекс.Музыка',
  youtube: 'YouTube',
  youtubeMusic: 'YouTube Music',
};

export const LISTEN_PROVIDERS = [
  'spotify',
  'appleMusic',
  'youtube',
  'youtubeMusic',
  'google',
  'pandora',
  'deezer',
  'tidal',
  'amazonMusic',
  'soundcloud',
  'napster',
  'yandex',
  'spinrilla',
];

export const BUY_PROVIDERS = ['itunes', 'googleStore', 'amazonStore'];
