import { Controller, Get, Query } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller('api/links')
export class LinksController {
  constructor(private readonly linksSerivce: LinksService) {}

  @Get('byUrl')
  async linksByUrl(@Query() query: any) {
    // @ts-ignore
    const req = await this.linksSerivce.getLinks(query.url);
    return req.data;
  }
}
