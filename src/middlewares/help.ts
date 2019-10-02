import Telegraf from 'telegraf';

// @ts-ignore
const bot = new Telegraf(process.env.TOKEN);

// @ts-ignore
bot.help(ctx => ctx.reply('Никогда ни на кого не обижайся. Ты человека прости или убей. © Иосиф Сталин'));

export default bot;
