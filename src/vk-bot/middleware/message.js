import isURL from 'validator/lib/isURL';
import _ from 'lodash';

import getData from 'lib/getData';
import parseURL from 'lib/parseURL';

const message = async (ctx, next) => {
  const message = ctx.message.body;
  const urls = await parseURL(message);

  if (message) {
    try {
      if (isURL(urls)) {
        const sendLinks = async () => {
          ctx.reply('🚬 Подождите немного, пока я ищу ссылки...');
          const data = await getData({
            link: urls
          });
          if (data) {
            const result = _.chain(data.songlink.nodesByUniqueId)
              .filter(item => item.sectionNodeUniqueId === 'AUTOMATED_SECTION::LISTEN' && item.url)
              .sortBy('displayName')
              .map(item => `${item.displayName}\n${item.url}\n\n`)
              .value()
              .join('');

            ctx.reply(result);
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
      ctx.reply('🤔 Я думаю, что это не ссылка...');
    }
  }
};

export default message;
