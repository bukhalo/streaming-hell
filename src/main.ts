import 'dotenv/config';
import Telegraf from 'telegraf';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import middlewares from './middlewares';

const bot = new Telegraf(process.env.TOKEN as string);
bot.use(middlewares);

if (process.env.NODE_ENV === 'dev') {
  bot.launch();
}

/* AWS Lambda handler function */
export const handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
): void => {
  if (event.body && typeof event.body === 'string') {
    bot.handleUpdate(JSON.parse(event.body));
    return callback(null, {
      statusCode: 200,
      body: '',
    });
  }
  return callback(null, {
    statusCode: 400,
    body: 'Empty request payload',
  });
};

export default handler;
