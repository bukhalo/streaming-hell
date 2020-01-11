import { Module } from '@nestjs/common';
import { SonglinkModule } from '../songlink/songlink.module';
import { LinksService } from './links.service';
import { LinksResolver } from './links.resolver';
import { LinksController } from './links.controller';

@Module({
  imports: [SonglinkModule],
  providers: [LinksService, LinksResolver],
  controllers: [LinksController]
})
export class LinksModule {}
