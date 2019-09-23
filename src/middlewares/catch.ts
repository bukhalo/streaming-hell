import Telegraf from 'telegraf';

// @ts-ignore
const bot = new Telegraf(process.env.TOKEN);

// @ts-ignore
bot.catch(err => {
  console.log('bot error: ', err);
});

export default bot;
