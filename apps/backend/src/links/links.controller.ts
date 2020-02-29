import { Controller, Get, Query } from '@nestjs/common';
import { OdeslyService } from '../odesly/odesly.service';
import { Observable } from 'rxjs';
import { LinksByEntityQuery } from './queries/links-by-entity.query';
import { LinksByUrlQuery } from './queries/links-by-url.query';

@Controller('links')
export class LinksController {
  constructor(private readonly odeslyService: OdeslyService) {}

  @Get('byEntity')
  byEntity(@Query() query: LinksByEntityQuery): Observable<any> {
    return this.odeslyService.links(query);
  }

  @Get('byUrl')
  byUrl(@Query() query: LinksByUrlQuery) {
    return this.odeslyService.links(query);
  }
}
