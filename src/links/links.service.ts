import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, Extra } from 'nestjs-telegraf';
import { chain, sortBy } from 'lodash';
import { request, gql } from 'graphql-request';
import { BUY_PLATFORMS, PlatformDictionary } from './links.constants';
import { Query } from '../core/types/graphql';

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);

  constructor(private readonly configService: ConfigService) {}

  /* Reply with links to other streaming services */
  private async replyFindedLinks(
    ctx: Context,
    linksByUrl: Query['linksByUrl'],
  ) {
    const linksSorted = sortBy(linksByUrl.links, [link => link.platform]);

    const listenLinks = linksSorted.filter(link => {
      return !BUY_PLATFORMS.includes(link.platform);
    });

    const buyLinks = linksSorted.filter(link => {
      return BUY_PLATFORMS.includes(link.platform);
    });

    const listenMessage = chain(listenLinks)
      .map(link => `[${PlatformDictionary[link.platform]}](${link.url})\n`)
      .value()
      .join('');

    const buyMessage = chain(buyLinks)
      .map(link => `[${PlatformDictionary[link.platform]}](${link.url})\n`)
      .value()
      .join('');

    await ctx.reply(
      `${ctx.i18n.t('LISTEN')}${listenMessage}\n${ctx.i18n.t(
        'BUY',
      )}${buyMessage}`,
      {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        disable_notification: true,
      },
    );
  }

  /* Reply with info about searched song */
  private async replySearchedSongInfo(ctx: Context, res: Query['linksByUrl']) {
    const { thumbnailUrl, artistName, title } = res.entity;

    if (thumbnailUrl) {
      await ctx.replyWithPhoto(
        {
          url: thumbnailUrl,
          // @ts-ignore
          disable_notification: true,
        },
        Extra.load({
          caption: `[${artistName} – ${title}](${res.pageUrl})`,
        }).markdown(),
      );
    } else {
      await ctx.reply(`*${artistName} – ${title}*`, {
        disable_notification: true,
        parse_mode: 'Markdown',
      });
    }
  }

  private songLinksNotFound(ctx) {
    ctx.reply(ctx.i18n.t('NO_DATA_BY_LINK'));
  }

  public findUrlsInMessage(message: string): string[] {
    const urlRegExp: RegExp = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;
    return message.match(urlRegExp);
  }

  async findLinksByUrls(ctx, urls: string[]) {
    /* Get data from OdesliAPI and send message by each link */
    if (urls.length > 0) {
      for (const [_, url] of urls.entries()) {
        try {
          const data = await request<{ linksByUrl: Query['linksByUrl'] }>(
            this.configService.get<string>('graphqlRequestModule.url'),
            gql`
              query($url: String!, $userCountry: String) {
                linksByUrl(url: $url, userCountry: $userCountry) {
                  pageUrl
                  entity {
                    title
                    artistName
                    thumbnailUrl
                  }
                  links {
                    platform
                    url
                    nativeAppUriMobile
                    nativeAppUriDesktop
                    entity {
                      id
                      type
                      title
                      artistName
                      thumbnailUrl
                      thumbnailWidth
                      thumbnailHeight
                      apiProvider
                      platforms
                    }
                  }
                }
              }
            `,
            {
              url,
              userCountry: ctx.update.message.from.language_code || 'US',
            },
          );
          if (!data.linksByUrl) this.songLinksNotFound(ctx);
          await this.replySearchedSongInfo(ctx, data.linksByUrl);
          await this.replyFindedLinks(ctx, data.linksByUrl);
        } catch (err) {
          this.songLinksNotFound(ctx);
          this.logger.error(err.response.data);
        }
      }
    }
  }
}
