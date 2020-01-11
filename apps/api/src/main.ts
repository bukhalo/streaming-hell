import 'dotenv/config';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { linksByUrl as songlinkLinksByUrl } from './songlink';

/* AWS Lambda handler function */
export const linksByUrl = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  console.log(event, context);
  if (event.queryStringParameters && event.queryStringParameters.url) {
    const test = await songlinkLinksByUrl(event.queryStringParameters.url);
    console.log(test);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(test),
    });
  }
  return callback(null, {
    statusCode: 400,
    body: 'Empty request payload',
  });
};

export default linksByUrl;
