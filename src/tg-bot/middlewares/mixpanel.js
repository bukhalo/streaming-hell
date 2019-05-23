import Telegraf from 'telegraf';
import TelegrafMixpanel from 'telegraf-mixpanel';

const bot = new Telegraf(process.env.TOKEN);
const mixpanel = new TelegrafMixpanel(process.env.MIXPANEL_TOKEN);

bot.use(mixpanel.middleware());

export default bot;
