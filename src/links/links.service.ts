import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, Extra } from 'nestjs-telegraf';
import { chain, sortBy } from 'lodash';

import { OdesliService } from '../providers/odesli/odesli.service';
import { ShazamService } from '../providers/shazam/shazam.service';
import { VkService } from '../providers/vk/vk.service';
import { Link, LinksByUrl } from './models';
import { PLATFORMS } from '../providers/odesli/odesli.constants';
import { ApiProvider, Platform } from '../core/enums';
import { BUY_PLATFORMS, PlatformDictionary } from './links.constants';

@Injectable()
export class LinksService {
  private logger = new Logger(LinksService.name);

  constructor(
    private readonly configSerivce: ConfigService,
    private readonly odesliService: OdesliService,
    private readonly shazamService: ShazamService,
    private readonly vkService: VkService,
  ) {}

  private async prepareUrl(url: string): Promise<string> {
    if (this.shazamService.isShazamLink(url)) {
      const shazamLinks = await this.shazamService.findLinks(url);
      if (shazamLinks.appleMusicLink || shazamLinks.spotifyLink) {
        return shazamLinks.appleMusicLink || shazamLinks.spotifyLink;
      }
    }
    return url;
  }

  /* Reply with links to other streaming services */
  private async replyFindedLinks(ctx: Context, linksByUrl: any) {
    const linksSorted = sortBy(linksByUrl.links, [link => link.platform]);

    const listenLinks = linksSorted.filter(link => {
      return !BUY_PLATFORMS.includes(link.platform);
    });

    const buyLinks = linksSorted.filter(link => {
      return BUY_PLATFORMS.includes(link.platform);
    });

    console.log(listenLinks);

    console.log(Platform['yandex']);

    const platformName = (platform: string) => {
      const filteredObject = Object.keys(Platform).filter(key =>
        platform === Platform[key] ? key : null,
      );
      return PlatformDictionary[filteredObject[0]];
    };

    const listenMessage = chain(listenLinks)
      .map(link => `[${platformName(link.platform)}](${link.url})\n`)
      .value()
      .join('');

    const buyMessage = chain(buyLinks)
      .map(link => `[${platformName(link.platform)}](${link.url})\n`)
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
  private async replySearchedSongInfo(ctx: Context, res: any) {
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
          const data = await this.getLinksByUrl(
            url,
            ctx.update.message.from.language_code || 'US',
          );
          if (!data) this.songLinksNotFound(ctx);
          await this.replySearchedSongInfo(ctx, data);
          await this.replyFindedLinks(ctx, data);
        } catch (err) {
          this.songLinksNotFound(ctx);
          this.logger.error(err.response.data);
        }
      }
    }
  }

  async getLinksByUrl(
    rawUrl: string,
    userCountry: string,
  ): Promise<LinksByUrl> {
    const url = await this.prepareUrl(rawUrl);

    const odesli = await this.odesliService
      .links({ url, userCountry })
      .toPromise();

    /** Links from Odesli */
    const odesliLinks: Link[] = [];
    PLATFORMS.forEach(platform => {
      const platformLinks = odesli.linksByPlatform[platform];
      const PlatformEnumKey = Object.keys(Platform).find(
        key => Platform[key] === platform,
      );
      if (platformLinks) {
        odesliLinks.push({
          platform: Platform[PlatformEnumKey],
          ...platformLinks,
          entity: odesli.entitiesByUniqueId[platformLinks.entityUniqueId],
        });
      }
    });

    /** Link from VK */
    const vkLink = (): Link => {
      return {
        platform: Platform.VK,
        url: this.vkService.getSearchLink(url),
        entity: {
          id: '',
          title: odesliLinks[0].entity.title,
          artistName: odesliLinks[0].entity.artistName,
          type: odesliLinks[0].entity.type,
          apiProvider: ApiProvider.VK,
          platforms: [Platform.VK, Platform.BOOM],
        },
      };
    };

    return {
      pageUrl: `https://streaming-hell.com/?url=${encodeURI(url)}`,
      userCountry,
      // @ts-ignore
      entity: odesli.entitiesByUniqueId[odesli.entityUniqueId],
      links: [...odesliLinks, vkLink()],
    };
  }
}
