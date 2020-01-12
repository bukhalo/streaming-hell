import { Module } from '@nestjs/common';
import { OdeslyModule } from '@app/odesly';
import { LinksController } from './links.controller';

@Module({
  imports: [OdeslyModule],
  controllers: [LinksController],
})
export class LinksModule {}
