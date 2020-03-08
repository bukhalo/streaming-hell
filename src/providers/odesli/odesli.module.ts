import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OdesliService } from './odesli.service';
import { odesliConfig } from './odesli.config';

@Module({
  imports: [
    ConfigModule.forFeature(odesliConfig),
    HttpModule.registerAsync({
      imports: [ConfigModule.forFeature(odesliConfig)],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('odesli.baseURL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [OdesliService],
  exports: [OdesliService],
})
export class OdesliModule {}
