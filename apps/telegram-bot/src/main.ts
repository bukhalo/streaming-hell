import 'dotenv/config';
import Bot from './bot'

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN as string)
bot.launch();
