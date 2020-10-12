import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Context, On } from 'nestjs-telegraf';
import { LinksService } from './links.service';

@Injectable()
export class LinksTelegramUpdate {
  constructor(private readonly linksService: LinksService) {}

  @On(['message'])
  async onMessage(ctx: Context, next) {
    const { message } = ctx;
    /**
     * Make sure it's a PM.
     * @see https://github.com/streaming-hell/streaming-hell/issues/9#issuecomment-573243323
     */
    if (message?.chat?.type !== 'private') return;

    /** Check message text exist in Telegram update */
    if (!message.text) {
      throw new HttpException('No text in message', HttpStatus.BAD_REQUEST);
    }

    /** Check streaming links exists in message */
    const urls = this.linksService.findUrlsInMessage(message.text);

    if (!urls) {
      await ctx.reply(ctx.i18n.t('NO_MUSIC_LINKS_IN_MESSAGE'));
      next();
      return;
    }

    /** Delete user message with streaming link */
    // @ts-ignore
    ctx.tg.deleteMessage(ctx.chat.id, ctx.message.message_id);

    await this.linksService.findLinksByUrls(ctx, urls);

    next();
  }
}
