import Telegraf from 'telegraf';
// @ts-ignore
import TelegrafMixpanel from 'telegraf-mixpanel';

// @ts-ignore
const bot = new Telegraf(process.env.TOKEN);
const mixpanel = new TelegrafMixpanel(process.env.MIXPANEL_TOKEN);

bot.use(mixpanel.middleware());

export default bot;
