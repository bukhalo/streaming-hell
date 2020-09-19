import { Module } from '@nestjs/common';
import { LinksUpdate } from './links.update';
import { LinksService } from './links.service';

@Module({
  providers: [LinksUpdate, LinksService],
})
export class LinksModule {}
