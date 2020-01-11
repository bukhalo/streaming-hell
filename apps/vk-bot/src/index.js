import 'dotenv/config';
import VkBot from 'node-vk-bot-api';
import message from './lib/message';

const bot = new VkBot(process.env.VK_BOT_TOKEN);

bot.event('message_new', message);

bot.startPolling();
