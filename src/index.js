import 'dotenv/config';
import Telegraf from 'telegraf';
import middlewares from './middlewares';

const bot = new Telegraf(process.env.TOKEN);
bot.use(middlewares);

// bot.launch();

/* AWS Lambda handler function */
export const handler = (event, context, callback) => {
  const tmp = JSON.parse(event.body);
  bot.handleUpdate(tmp);
  return callback(null, {
    statusCode: 200,
    body: ''
  });
};

export default handler;
