import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class SonglinkService {
  constructor(
    readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  links(
    url: string,
    userCountry: string,
    platform: string,
    type: string,
    id: string,
  ): Promise<any> {
    return this.httpService
      .get('/links', {
        params: {
          url,
          userCountry,
          platform,
          type,
          id,
        },
      })
      .toPromise();
  }
}
