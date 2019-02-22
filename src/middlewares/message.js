import Telegraf from 'telegraf';
import isURL from 'validator/lib/isURL';

import getData from 'lib/getData';
import parseURL from 'lib/parseURL';

const bot = new Telegraf(process.env.TOKEN);

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

bot.on('message', async ctx => {
  ctx.mixpanel.people.set();
  ctx.mixpanel.people.increment('msg_cnt');
  ctx.mixpanel.track('msg', {
    text: ctx.message.text
  });

  const message = ctx.message.text;
  const urls = await parseURL(message);
  if (message) {
    try {
      if (isURL(urls)) {
        const sendLinks = async () => {
          ctx.reply('🚬 Подождите немного, пока я ищу ссылки...');
          ctx.mixpanel.people.increment('req_cnt');
          const data = await getData({ link: urls });
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
              links = `${links}\n*${name}*\n${item.data.listenUrl}\n`;
              console.log()
            });

            ctx.mixpanel.track('req', {
              Artist: data.songlink.artistName,
              Title: data.songlink.title,
              Provider: data.songlink.provider,
              Type: data.songlink.type,
              AlbumType: data.songlink.albumType,
              Genre: data.songlink.genre,
              URL: urls,
            });

            ctx.reply(links, { parse_mode: 'markdown' });
            ctx.reply('👋 Готово!');
            ctx.mixpanel.people.increment('res_cnt');
          } else {
            ctx.reply('😣 Кажется у меня нет данных по этой ссылке. Убедись, что адрес верный.');
            ctx.mixpanel.people.increment('res_cnt');
            ctx.mixpanel.people.increment('res_no_data_cnt');
            ctx.mixpanel.track('', {
              URL: urls
            });
          }
        };
        sendLinks();
      } else {
        ctx.reply('🤔 Я думаю, что это не ссылка...');
        ctx.mixpanel.people.increment('msg_not_link_cnt');
      }
    } catch (e) {
      console.error('Link validation error');
    }
  }
});

export default bot;
