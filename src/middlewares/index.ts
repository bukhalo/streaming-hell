import Telegraf from 'telegraf';
import botCatch from './catch';
// @ts-ignore
import mixpanel from './mixpanel';
// @ts-ignore
import start from './start';
import help from './help';
import heares from './heares';
// @ts-ignore
import message from './message';

// @ts-ignore
const bot = new Telegraf(process.env.TOKEN);

bot.use(botCatch);
bot.use(mixpanel);
bot.use(start);
bot.use(help);
bot.use(heares);
bot.use(message);

export default bot;
