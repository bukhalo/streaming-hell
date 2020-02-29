import { Module } from '@nestjs/common';
import { OdeslyModule } from '../odesly/odesly.module';
import { LinksController } from './links.controller';

@Module({
  imports: [OdeslyModule],
  controllers: [LinksController],
})
export class LinksModule {}
