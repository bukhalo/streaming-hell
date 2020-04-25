import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = app.get('ConfigService');
  const telegrafProvider = app.get('TelegrafProvider');
  app.use(telegrafProvider.webhookCallback('/webhook'));
  await app.listen(configService.get('app.port'));
}
bootstrap();
