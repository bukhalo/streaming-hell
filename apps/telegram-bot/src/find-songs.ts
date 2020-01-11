import { AxiosResponse } from 'axios';
import { chain, map, sortBy } from 'lodash';
import { OdeslyAPI } from './odesly-api';
import { MessageParser } from './message-parser';
import { ContextMessageUpdate, Extra } from 'telegraf';

type OdeslyPlatforms =
  | 'spotify'
  | 'itunes'
  | 'appleMusic'
  | 'youtube'
  | 'youtubeMusic'
  | 'google'
  | 'googleStore'
  | 'pandora'
  | 'deezer'
  | 'tidal'
  | 'amazonStore'
  | 'amazonMusic'
  | 'soundcloud'
  | 'napster'
  | 'yandex'
  | 'spinrilla';

interface IOdeslyAPIParams {
  url?: string;
  platform?: OdeslyPlatforms;
  type?: 'song' | 'album';
  id?: string;
  key?: string;
  userCountry?: string;
}

export class FindSongs {
  ctx: ContextMessageUpdate
  odeslyAPI: any;
  providersDictionary = {
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

  constructor(ctx: ContextMessageUpdate) {
    this.ctx = ctx
    this.odeslyAPI = new OdeslyAPI(process.env.ODESLY_API_KEY as string);
  }

  private getDisplayName(providerName: string): string {
    // @ts-ignore
    return this.providersDictionary[providerName];
  }

  private sendSongLinksNotFound() {
    this.ctx.reply('В сообщении не найдены ссылки на музыкальные сервисы');
  }

  async sendMessage() {
    const messageText = this.ctx?.message?.text

    if (messageText) {
      /* Find URL's in message */
      const parsedMessage = new MessageParser(messageText);
      await parsedMessage.findUrlsInMessage();

      if (!parsedMessage.isMessageHasUrls) {
        this.sendSongLinksNotFound()
      }

      /* Get data from OdeslyAPI by each links */
      for (const [_, url] of parsedMessage.messageUrls.entries()) {
        try {
          const { data } = await this.odeslyAPI.links({ url })
          const items = map(data.linksByPlatform, (value, key) => {
            return {
              providerName: key,
              displayName: this.getDisplayName(key),
              ...value,
            };
          });
          const findedItems = sortBy(items, [i => i.displayName]);
          const currentItem = data.entitiesByUniqueId[data.entityUniqueId];
          const result = chain(findedItems)
          .map(
            item => `*${item.displayName}*\n[${item.url}](${item.url})\n\n`,
          )
          .value()
          .join('');
  
          /* Send message */
          this.sendSongInfo(result, currentItem.thumbnailUrl, currentItem.artistName, currentItem.title)
        } catch(err) {
          this.sendSongLinksNotFound()
          console.error(err.response.data);
        }
      }
    }
  }

  async sendSongInfo(message: string, thumbnailUrl: string, artistName: string, title: string) {
    /* Message with song / album info */
    await this.ctx.replyWithPhoto({
        url: thumbnailUrl,
        // @ts-ignore
        disable_notification: true,
      },
      Extra.load({
        caption: `${artistName} – ${title}`,
      }).markdown(),
    );

    /* Message with links on other streaming services */
    await this.ctx.reply(message, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      disable_notification: true,
    });
  }
}

export default FindSongs;
