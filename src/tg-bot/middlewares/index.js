import Telegraf from 'telegraf';
import botCatch from 'middlewares/catch';
import mixpanel from 'middlewares/mixpanel';
import start from 'middlewares/start';
import help from 'middlewares/help';
import heares from 'middlewares/heares';
import message from 'middlewares/message';

const bot = new Telegraf(process.env.TOKEN);

bot.use(botCatch);
bot.use(mixpanel);
bot.use(start);
bot.use(help);
bot.use(heares);
bot.use(message);

export default bot;
