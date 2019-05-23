import Telegraf from 'telegraf';

const bot = new Telegraf(process.env.TOKEN);

bot.hears('тотален', ctx => ctx.reply('100% пидор'));

export default bot;
