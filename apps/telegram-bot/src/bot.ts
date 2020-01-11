import 'dotenv/config';
import Telegraf, { ContextMessageUpdate } from 'telegraf';
import FindSongs from './find-songs';

export default class Bot {
  telegraf: Telegraf<ContextMessageUpdate>
  telegramBotToken: string

  constructor(telegramBotToken: string) {
    this.telegramBotToken = telegramBotToken
    this.telegraf = new Telegraf(this.telegramBotToken);
  }

  /* Bot start command */
  private start(ctx: ContextMessageUpdate) {
    ctx.reply(
      '👋 Привет!\n\nПоделись со мной ссылкой на трек или альбом из любого приложения, а я в ответ пришлю ссылки, на все музыкальные сервисы где можно найти этот альбом или композицию.',
    );
  }

  /* Listen messages */
  private async onMessage(ctx: ContextMessageUpdate) {
    const songs = new FindSongs(ctx)
    songs.sendMessage()
  }

  /* Error handling */
  private catch(err: any): void {
    console.error(`Error: ${err}`);
  };

  /* Launch bot */
  public launch() {
    this.telegraf.catch(this.catch)
    this.telegraf.start(this.start)
    this.telegraf.on('message', this.onMessage);
    this.telegraf.launch();
  }
}
