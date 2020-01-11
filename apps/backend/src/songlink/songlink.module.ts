import { Module, HttpModule } from '@nestjs/common';
import { SonglinkService } from './songlink.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        baseURL: config.songlinkApiUrl,
        params: {
          key: config.songlinkApiKey,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SonglinkService],
  exports: [SonglinkService],
})
export class SonglinkModule {}
