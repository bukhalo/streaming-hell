import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  HttpService,
} from '@nestjs/common';
import { TelegrafOn } from 'nestjs-telegraf';
import { ContextMessageUpdate, Extra } from 'telegraf';
import { chain, map, sortBy } from 'lodash';
import { map as rxMap, catchError } from 'rxjs/operators';
import { UsersService } from '../users/users.service';
import {
  LISTEN_PROVIDERS,
  BUY_PROVIDERS,
  PROVIDERS_DICTIONARY,
} from './song-link-pm.constants';
import { ShazamService } from '../shazam/shazam.service';

@Injectable()
export class SongLinkPmService {
  private readonly logger = new Logger(SongLinkPmService.name);
  constructor(
    private readonly httpService: HttpService,
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

    const listenLinks = linksSorted.filter(item => {
      return LISTEN_PROVIDERS.includes(item.providerName);
    });

    const listenMessage = chain(listenLinks)
      .map(item => `[${item.displayName}](${item.url})\n`)
      .value()
      .join('');

    const buyLinks = linksSorted.filter(item => {
      return BUY_PROVIDERS.includes(item.providerName);
    });

    const buyMessage = chain(buyLinks)
      .map(item => `[${item.displayName}](${item.url})\n`)
      .value()
      .join('');

    await ctx.reply(
      `🎧 *Слушать*\n\n${listenMessage}\n\n🛍 *Купить*\n\n${buyMessage}`,
      {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        disable_notification: true,
      },
    );
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
    return PROVIDERS_DICTIONARY[providerName];
  }

  private songLinksNotFound(ctx) {
    ctx.reply('К сожалению у нас нет данных по этой ссылке 😕');
  }

  private songLinksNotFoundInMessage(ctx) {
    ctx.reply('В сообщении не найдены ссылки на музыкальные сервисы');
  }
  public findUrlsInMessage(message: string): string[] {
    const urlRegExp: RegExp = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;
    return message.match(urlRegExp);
  }

  @TelegrafOn('message')
  async onMessage(ctx, next) {
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
      next();
      return;
    }

    // @ts-ignore
    ctx.tg.deleteMessage(ctx.chat.id, ctx.message.message_id);

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
          const data = await this.httpService
            .get('/links/byUrl', { params: { url } })
            .pipe(rxMap(response => response.data))
            .pipe(catchError((e) => {
              console.error(e);
              this.logger.error(`Error on API request ${e}`);
              throw new Error();
            }),)
            .toPromise();
          if (!data) this.songLinksNotFound(ctx);
          await this.replySearchedSongInfo(ctx, data, url);
          await this.replyFindedLinks(ctx, data);
        } catch (err) {
          this.songLinksNotFound(ctx);
          this.logger.error(err.response.data);
        }
      }
    }

    next();
  }

  async user(ctx) {
    const {
      id,
      is_bot,
      first_name,
      last_name,
      username,
      language_code,
    } = ctx.message.from;

    console.log(ctx.message);

    // get user by telegram user id
    const findedUser = await this.usersService.findByUserId(id);

    // save user in DB if not exist
    if (!findedUser) {
      const test2 = await this.usersService.create({
        userId: id,
        isBot: is_bot,
        firstName: first_name,
        lastName: last_name,
        username,
        languageCode: language_code,
      });
      console.log(test2);
    }
  }
}
