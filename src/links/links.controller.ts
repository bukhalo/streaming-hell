import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OdesliService } from '../odesli/odesli.service';
import { Observable } from 'rxjs';
import { LinksByEntityQuery } from './queries/links-by-entity.query';
import { LinksByUrlQuery } from './queries/links-by-url.query';

@ApiTags('Links')
@Controller('links')
export class LinksController {
  constructor(private readonly odesliService: OdesliService) {}

  @Get('byEntity')
  byEntity(@Query() query: LinksByEntityQuery): Observable<any> {
    return this.odesliService.links(query);
  }

  @Get('byUrl')
  @ApiOperation({
    description:
      'Get links by URL of a valid song or album from any of our supported platforms',
  })
  byUrl(@Query() query: LinksByUrlQuery) {
    return this.odesliService.links(query);
  }
}
