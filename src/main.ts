import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

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

  await app.listen(configService.get('app.port'));
}
bootstrap();
