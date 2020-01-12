import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OdeslyService } from './odesly.service';
import { odeslyConfig } from './odesly.config';

@Module({
  imports: [
    ConfigModule.forFeature(odeslyConfig),
    HttpModule.registerAsync({
      imports: [ConfigModule.forFeature(odeslyConfig)],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('odesly.baseURL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [OdeslyService],
  exports: [OdeslyService],
})
export class OdeslyModule {}
