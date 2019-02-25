import Telegraf from 'telegraf';

const bot = new Telegraf(process.env.TOKEN);

bot.help(ctx =>
  ctx.reply('Никогда ни на кого не обижайся. Ты человека прости или убей. © Иосиф Сталин')
);

export default bot;
