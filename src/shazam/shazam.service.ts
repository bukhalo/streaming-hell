import { HttpException, HttpService, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { isURL } from 'class-validator';
import { FindLinks } from './interfaces/find-links.interface';
import { ShazamDiscovery } from './interfaces/shazam-discovery.interface';

@Injectable()
export class ShazamService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(ShazamService.name);

  /**
   * Check is valid shazam link
   * @param link Shazam link URL
   */
  public isShazamLink(link: string): boolean {
    return link.includes('shazam.com');
  }

  /**
   * Extract shazam entity ID from shazam link
   * @param link Shazam link URL
   */
  public extractEntityId(link: string): string {
    const [shazamLinkId] = link.split('/').filter((pathPart: any) => {
      return !isNaN(pathPart) && pathPart !== '';
    });
    return shazamLinkId;
  }

  /**
   * Get entity info through Shazam discovery API
   * @param entityId Shazam entity ID
   * TODO: May be try new API https://www.shazam.com/discovery/v5/en-US/RU/web/-/track/51050182
   */
  private shazamDiscovery(
    entityId: string,
  ): Observable<AxiosResponse<ShazamDiscovery>> {
    return this.httpService
      .get(`https://www.shazam.com/discovery/v4/ru/US/web/-/track/${entityId}`)
      .pipe(res => res)
      .pipe(
        catchError(e => {
          throw new HttpException(
            'Error on Shazam discovery query execution',
            e.response.status,
          );
        }),
      );
  }

  /**
   * Find links on Apple Music and Spotify by Shazam link
   * @param link Shazam shared link
   * @example https://www.shazam.com/track/51050182/the-sound-john-m-perkins-blues
   */
  public async findLinks(link: string): Promise<FindLinks> {
    if (this.isShazamLink(link)) {
      const entityId = this.extractEntityId(link);
      const shazamDiscovery = await this.shazamDiscovery(entityId).toPromise();
      const appleMusicLink =
        shazamDiscovery.data.hub.options.apple.openin.actions[0].uri || null;

      /**
       * Spotify links temporary not supported
       * Shazam discovery returns something like "spotify:track:5amQCXAsSQYm26BwxY1ZCx"
       * insted Spotify link
       */
      // const spotifyLink = shazamDiscovery.data.hub.options.spotify.openin.actions[0].uri || null;
      return {
        appleMusicLink: isURL(appleMusicLink) ? appleMusicLink : null,
        // spotifyLink: isURL(spotifyLink) ? appleMusicLink : null,
      };
    }
  }
}
