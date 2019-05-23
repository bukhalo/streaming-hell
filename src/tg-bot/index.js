import Telegraf from 'telegraf';
import middlewares from './middlewares';

const bot = new Telegraf(process.env.TOKEN);
bot.use(middlewares);
bot.launch();
