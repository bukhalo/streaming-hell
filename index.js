require('dotenv').config();
const Telegraf = require('telegraf');
const getData = require('./getData');
const parseURL = require('./parseURL');
const validator = require('validator');
const readableNames = {
    yandex: 'Yandex',
    spotify: 'Spotify',
    appleMusic: 'Apple Music',
    youtubeMusic: 'YouTube Music',
    youtube: 'YouTube',
    pandora: 'Pandora',
    google: 'Google',
    deezer: 'Deezer',
    tidal: 'Tidal',
    napster: 'Napster',
    fanburst: 'Fanburst',
    amazonMusic: 'Amazon Music',
    soundcloud: 'SoundCloud'
};
const bot = new Telegraf(process.env.TOKEN);
bot.start((ctx) => {
    ctx.reply('👋 Привет!\n\nПоделись со мной ссылкой на трек или альбом из любого приложения, а я в ответ пришлю ссылки, на все музыкальные сервисы где можно найти этот альбом или композицию.')
});

bot.help((ctx) => ctx.reply('Никогда ни на кого не обижайся. Ты человека прости или убей. © Иосиф Сталин'));

bot.hears('тотален', (ctx) => ctx.reply('100% пидор'));

bot.on('message', async (ctx) => {
    const message = ctx.message.text;
    const urls = parseURL(message);
    if (message) {
        try {
            if (validator.isURL(urls[0])) {
                const sendLinks = async () => {
                    ctx.reply('🚬 Подождите немного, пока я ищу ссылки...');
                    const data = await getData({link: urls[0]});
                    if (data) {
                        let links = '';
                        data.songlink.links.listen.sort((a, b) => {
                            const nameA = readableNames[a.name] || a.name;
                            const nameB = readableNames[b.name] || b.name;
                            if (nameA > nameB) {
                                return 1;
                            } else if (nameA < nameB) {
                                return -1;
                            }
                            return 0;
                        });
                        data.songlink.links.listen.forEach(item => {
                            const name = readableNames[item.name] || item.name;
                            links = `${links}\n[${name}](${item.data.listenUrl})\n`;
                        });
                        ctx.reply(links, {parse_mode: 'markdown'});
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
