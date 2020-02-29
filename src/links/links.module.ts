import { Module } from '@nestjs/common';
import { OdesliModule } from '../odesli/odesli.module';
import { LinksController } from './links.controller';

@Module({
  imports: [OdesliModule],
  controllers: [LinksController],
})
export class LinksModule {}
