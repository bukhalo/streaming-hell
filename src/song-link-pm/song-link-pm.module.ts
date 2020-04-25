import { HttpModule, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SongLinkPmService } from './song-link-pm.service';
import { ShazamModule } from '../shazam/shazam.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.streaming-hell.com/v1/',
    }),
    ShazamModule,
    UsersModule,
  ],
  providers: [SongLinkPmService],
})
export class SongLinkPmModule {}
