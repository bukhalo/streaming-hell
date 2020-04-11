import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const options = new DocumentBuilder()
    .setTitle('Streaming Hell API')
    .setDescription('')
    .setVersion('v1')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1', app, document);

  await app.listen(4000);
}
bootstrap();
