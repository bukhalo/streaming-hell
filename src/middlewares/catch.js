import Telegraf from 'telegraf';

const bot = new Telegraf(process.env.TOKEN);

bot.catch(err => {
  console.log('bot error: ', err);
});

export default bot;
