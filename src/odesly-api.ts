import axios, { AxiosResponse, AxiosInstance } from 'axios';

type OdeslyPlatforms =
  | 'spotify'
  | 'itunes'
  | 'appleMusic'
  | 'youtube'
  | 'youtubeMusic'
  | 'google'
  | 'googleStore'
  | 'pandora'
  | 'deezer'
  | 'tidal'
  | 'amazonStore'
  | 'amazonMusic'
  | 'soundcloud'
  | 'napster'
  | 'yandex'
  | 'spinrilla';

interface IOdeslyAPIParams {
  url?: string;
  platform?: OdeslyPlatforms;
  type?: 'song' | 'album';
  id?: string;
  key?: string;
  userCountry?: string;
}

export class OdeslyAPI {
  private axios: AxiosInstance;
  private apiKey: string;
  private apiBaseUrl: string = 'https://api.song.link';
  private apiVersion: string = 'v1-alpha.1';

  constructor(apiKey: string) {
    this.axios = axios.create({
      baseURL: `${this.apiBaseUrl}/${this.apiVersion}/`,
    });
    this.apiKey = apiKey;
  }

  /*
   ** Generate odesly.co API request parameters
   ** Doc: https://github.com/songlink/docs/blob/master/api-v1-alpha.1.md#query-params
   */
  private getRequestParams(params: IOdeslyAPIParams) {
    const { url, userCountry = 'US', platform, type, id } = params;

    /* Search by URL parameter */
    if (url) {
      return { params: { url, userCountry, key: this.apiKey } };
    }

    /* Search by Platform, Type and ID parameters */
    if (platform && type && id) {
      return { params: { userCountry, platform, type, id, key: this.apiKey } };
    }

    throw new Error('URL or Platform + Type + ID parameters required!');
  }

  /*
   ** Make request to odesly.co API
   ** Doc: https://github.com/songlink/docs/blob/master/api-v1-alpha.1.md#get-links-endpoint
   */
  public async links(params: IOdeslyAPIParams): Promise<AxiosResponse> {
    return await this.axios.get('links', this.getRequestParams(params));
  }
}

export default OdeslyAPI;
