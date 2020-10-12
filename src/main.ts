import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { resolve } from 'path';
import * as helmet from 'helmet';
import * as TelegrafI18n from 'telegraf-i18n';
import { TelegrafMongoSession } from 'telegraf-session-mongodb';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const telegraf = app.get('TelegrafProvider');
  const configService = app.get('ConfigService');

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3010',
      'http://127.0.0.1:3010',
    ],
    credentials: true,
  });
  app.use(
    // @ts-ignore
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  /**
   * Configure Swagger docs
   */
  const options = new DocumentBuilder()
    .setTitle('Streaming Hell API')
    .setDescription('')
    .setVersion('v1')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1', app, document);

  // Telegraf session storage
  await TelegrafMongoSession.setup(telegraf, configService.get('MONGODB_URI'), {
    collectionName: 'telegrafSessions',
    sessionName: 'session',
  });

  // Telegraf i18n instance
  // @ts-ignore
  const i18n = new TelegrafI18n({
    defaultLanguage: 'en',
    allowMissing: false,
    sessionName: 'session',
    useSession: true,
    directory: resolve(__dirname, 'core/i18n'),
  });
  telegraf.use(i18n.middleware());
  app.use(telegraf.webhookCallback('/webhook'));

  await app.listen(configService.get('app.port'));
}
bootstrap();
