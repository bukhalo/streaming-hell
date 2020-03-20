import { Module, HttpModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramBotService } from './telegram-bot.service';
import { OdesliModule } from '../providers/odesli/odesli.module';
import { ShazamModule } from '../providers/shazam/shazam.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HttpModule,
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    OdesliModule,
    ShazamModule,
    UsersModule,
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
