import Telegraf from 'telegraf';

// @ts-ignore
const bot = new Telegraf(process.env.TOKEN);

// @ts-ignore
bot.hears('тотален', ctx => ctx.reply('100% пидор'));

export default bot;
