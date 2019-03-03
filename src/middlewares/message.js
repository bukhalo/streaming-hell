import Telegraf from 'telegraf';
import isURL from 'validator/lib/isURL';
import _ from 'lodash';

import getData from 'lib/getData';
import parseURL from 'lib/parseURL';

const bot = new Telegraf(process.env.TOKEN);

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
          const data = await getData({
            link: urls
          });
          if (data) {
            ctx.mixpanel.track('req', {
              Artist: data.songlink.artistName,
              Title: data.songlink.title,
              Provider: data.songlink.provider,
              Type: data.songlink.type,
              Genre: data.songlink.genre,
              URL: urls
            });

            const result = _.chain(data.songlink.nodesByUniqueId)
              .filter(item => item.sectionNodeUniqueId === 'AUTOMATED_SECTION::LISTEN' && item.url)
              .sortBy('displayName')
              .map(item => `*${item.displayName}*\n[${item.url}](${item.url})\n\n`)
              .value()
              .join('');

            ctx.reply(result, {
              parse_mode: 'markdown'
            });
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
