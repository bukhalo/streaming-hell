import Telegraf from 'telegraf';
import botCatch from './catch';
import mixpanel from './mixpanel';
import start from './start';
import help from './help';
import heares from './heares';
import message from './message';

const bot = new Telegraf(process.env.TOKEN);

bot.use(botCatch);
bot.use(mixpanel);
bot.use(start);
bot.use(help);
bot.use(heares);
bot.use(message);

export default bot;
