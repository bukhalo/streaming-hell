import {
  Injectable,
  HttpService,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Validator, Validate } from 'typescript-param-validator';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LinksParams } from './params/links.params';

@Injectable()
export class OdeslyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  /*
   ** Validate odesly.co API request parameters
   ** Doc: https://github.com/songlink/docs/blob/master/api-v1-alpha.1.md#query-params
   */
  private validateRequestParams(params: LinksParams) {
    const { url, platform, type, id } = params;
    console.log(params);
    if (!url && !platform && !type && !id) {
      Logger.error(
        'URL or Platform + Type + ID parameters required!',
        JSON.stringify(params),
        'ODESLY',
      );
      throw new HttpException(
        'URL or Platform + Type + ID parameters required!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /*
   ** Make request to odesly.co API
   ** Doc: https://github.com/songlink/docs/blob/master/api-v1-alpha.1.md#get-links-endpoint
   */
  @Validate()
  /* TODO: Write interface for function return */
  public links(@Validator() linksParams: LinksParams): Observable<any> {
    const params = {
      ...linksParams,
      key: this.configService.get('odesly.apiKey'),
    };
    this.validateRequestParams(params);
    return this.httpService
      .get('links', { params })
      .pipe(map(response => response.data))
      .pipe(
        catchError(e => {
          throw new HttpException(
            'Error while /links request',
            e.response.status,
          );
        }),
      );
  }
}
