import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { app, validationOptions, validationSchema } from './core/configs';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      load: [app],
      validationOptions,
      validationSchema,
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
