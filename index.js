require('dotenv').config();
const Telegraf = require('telegraf');
const getData = require('./getData');
const parseURL = require('./parseURL');
const validator = require('validator');
const bot = new Telegraf(process.env.TOKEN);
bot.start((ctx) => {
    ctx.reply('👋 Привет!\n\nПоделись со мной ссылкой на трек или альбом из любого приложения, а я в ответ пришлю ссылки, на все музыкальные сервисы где можно найти этот альбом или композицию.')
});
bot.help((ctx) => ctx.reply('Никогда ни на кого не обижайся. Ты человека прости или убей. © Иосиф Сталин'));

bot.hears('тотален', (ctx) => ctx.reply('100% пидор'));

bot.on('message', async (ctx) => {
    const message = ctx.message.text;
    const urls = parseURL(message);
    if (urls[0]) {
        try {
            if (validator.isURL(urls[0])) {
                const sendLinks = async () => {
                    ctx.reply('🚬 Подождите немного, пока я ищу ссылки...');
                    const data = await getData({ link: urls[0] });
                    if (data) {
                        let links = '';
                        data.songlink.links.listen.forEach(item => {
                            links = `${links}\n${item.name}\n${item.data.listenUrl}\n`;
                        });
                        ctx.reply(links);
                        ctx.reply('👋 Готово!');
                    } else {
                        ctx.reply('😣 Кажется у меня нет данных по этой ссылке. Убедись, что адрес верный.');
                    }
                };
                sendLinks();
            } else {
                ctx.reply('🤔 Я думаю, что это не ссылка...');
            }
        } catch (e) {
            console.error('Link validation error');
        }
    }
});

bot.launch();