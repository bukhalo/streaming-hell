/* eslint-disable @typescript-eslint/camelcase */
import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OdesliService } from '../providers/odesli/odesli.service';
import {
  TelegrafTelegramService,
  TelegramActionHandler,
} from 'nestjs-telegraf';
import { ContextMessageUpdate, Extra } from 'telegraf';
import { chain, map, sortBy } from 'lodash';
import { UsersService } from '../users/users.service';
import { ShazamService } from '../providers/shazam/shazam.service';

type OdesliPlatforms =
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

interface IOdesliAPIParams {
  url?: string;
  platform?: OdesliPlatforms;
  type?: 'song' | 'album';
  id?: string;
  key?: string;
  userCountry?: string;
}

@Injectable()
export class TelegramBotService {
  private readonly logger = new Logger(TelegramBotService.name);
  private readonly providersDictionary = {
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

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly telegrafTelegramService: TelegrafTelegramService,
    private readonly odesliService: OdesliService,
    private readonly shazamService: ShazamService,
    private readonly usersService: UsersService,
  ) {}

  /* Reply with links to other streaming services */
  private async replyFindedLinks(
    ctx: ContextMessageUpdate,
    odesliResponse: any,
  ) {
    const links = map(odesliResponse.linksByPlatform, (value, key) => {
      return {
        providerName: key,
        displayName: this.getDisplayName(key),
        ...value,
      };
    });
    const linksSorted = sortBy(links, [i => i.displayName]);

    const listenProviders = [
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

    const buyProviders = ['itunes', 'googleStore', 'amazonStore'];

    const listenLinks = linksSorted.filter(item => {
      return listenProviders.includes(item.providerName);
    });

    const listenMessage = chain(listenLinks)
      .map(item => `*${item.displayName}*\n[${item.url}](${item.url})\n\n`)
      .value()
      .join('');

    const buyLinks = linksSorted.filter(item => {
      return buyProviders.includes(item.providerName);
    });

    const buyMessage = chain(buyLinks)
      .map(item => `*${item.displayName}*\n[${item.url}](${item.url})\n\n`)
      .value()
      .join('');

    await ctx.reply(`🎧 Слушать\n\n${listenMessage}\n🛒 Купить\n\n${buyMessage}`, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      disable_notification: true,
    });
  }

  /* Reply with info about searched song */
  private async replySearchedSongInfo(
    ctx: ContextMessageUpdate,
    res: any,
    url: string,
  ) {
    /* Extract searched entity in odesli response */
    const entity = res.entitiesByUniqueId[res.entityUniqueId];
    const { thumbnailUrl, artistName, title } = entity;
    const shLink = `https://streaming-hell.com/?url=${encodeURI(url)}`;

    /* Check thumbnail exist in odesli response */
    if (thumbnailUrl) {
      await ctx.replyWithPhoto(
        {
          url: thumbnailUrl,
          // @ts-ignore
          disable_notification: true,
        },
        Extra.load({
          caption: `[${artistName} – ${title}](${shLink})`,
        }).markdown(),
      );
    } else {
      await ctx.reply(`*${artistName} – ${title}*`, {
        disable_notification: true,
        parse_mode: 'Markdown',
      });
    }
  }

  private getDisplayName(providerName: string): string {
    // @ts-ignore
    return this.providersDictionary[providerName];
  }

  private songLinksNotFound(ctx: ContextMessageUpdate) {
    ctx.reply('К сожалению у нас нет данных по этой ссылке 😕');
  }

  private songLinksNotFoundInMessage(ctx: ContextMessageUpdate) {
    ctx.reply('В сообщении не найдены ссылки на музыкальные сервисы');
  }
  public findUrlsInMessage(message: string): string[] {
    const urlRegExp: RegExp = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;
    return message.match(urlRegExp);
  }

  @TelegramActionHandler({ onStart: true })
  async startCommand(ctx: ContextMessageUpdate) {
    await ctx.reply(
      '👋 Привет!\n\nПоделись со мной ссылкой на трек или альбом из любого приложения, а я в ответ пришлю ссылки, на все музыкальные сервисы где можно найти этот альбом или композицию.',
    );
  }

  @TelegramActionHandler({ message: RegExp('') })
  async onMessage(ctx: ContextMessageUpdate) {
    this.user(ctx);

    const { message } = ctx;

    let links: string[] = [];

    /*
     ** Make sure it's a PM.
     ** https://github.com/streaming-hell/streaming-hell/issues/9#issuecomment-573243323
     */
    if (message.chat.type !== 'private') return;

    /* Check message text exist in Telegraf context */
    if (!message.text) {
      throw new HttpException('No text in message', HttpStatus.BAD_REQUEST);
    }

    /* Find links in message */
    const messageLinks = this.findUrlsInMessage(message.text);
    if (messageLinks) {
      links = messageLinks;
    } else {
      this.songLinksNotFoundInMessage(ctx);
    }

    /* Detect Shazam URL's */
    if (links.length > 0) {
      for (const [index, url] of links.entries()) {
        if (this.shazamService.isShazamLink(url)) {
          const shazamDiscovery = await this.shazamService.findLinks(url);
          if (shazamDiscovery.appleMusicLink) {
            links.splice(index, 1, shazamDiscovery.appleMusicLink);
          } else {
            links = links.filter((_, idx: number) => idx !== index);
          }
        }
      }
    }

    /* Get data from OdesliAPI and send message by each link */
    if (links.length > 0) {
      for (const [_, url] of links.entries()) {
        try {
          const data = await this.odesliService.links({ url }).toPromise();
          if (!data) this.songLinksNotFound(ctx);
          await this.replySearchedSongInfo(ctx, data, url);
          await this.replyFindedLinks(ctx, data);
        } catch (err) {
          this.songLinksNotFound(ctx);
          this.logger.error(err.response.data);
        }
      }
    }
  }

  async user(ctx: ContextMessageUpdate) {
    const {
      id,
      is_bot,
      first_name,
      last_name,
      username,
      language_code,
    } = ctx.message.from;

    // get user by telegram user id
    const findedUser = await this.usersService.findByTelegramUserID(id);

    // save user in DB if not exist
    if (!findedUser) {
      await this.usersService.createFromTelegram({
        telegram: {
          userID: id,
          isBot: is_bot,
          firstName: first_name,
          lastName: last_name,
          username,
          languageCode: language_code,
        },
      });
    }
  }
}
