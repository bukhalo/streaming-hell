import Telegraf from 'telegraf';

// @ts-ignore
const bot = new Telegraf(process.env.TOKEN);

// @ts-ignore
bot.start(ctx => {
  ctx.mixpanel.people.set({
    $created: new Date().toISOString()
  });
  ctx.reply(
    '👋 Привет!\n\nПоделись со мной ссылкой на трек или альбом из любого приложения, а я в ответ пришлю ссылки, на все музыкальные сервисы где можно найти этот альбом или композицию.'
  );
});

export default bot;
