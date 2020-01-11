import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import SpotifyWebApi from 'spotify-web-api-node';

@Injectable()
export class SpotifyService {
  public spotify: any;

  constructor(private readonly config: ConfigService) {
    this.spotify = new SpotifyWebApi({
      // @ts-ignore
      clientId: this.config.SPOTIFY_CLIENT_ID,
      // @ts-ignore
      clientSecret: this.config.SPOTIFY_CLIENT_SECRET,
    });
    this.auth();
  }

  private async auth() {
    try {
      const auth = await this.spotify.clientCredentialsGrant();
      this.spotify.setAccessToken(auth.body.access_token);
      Logger.debug(`The access token expires in ${auth.body.expires_in}`);
      Logger.debug(`The access token is ${auth.body.access_token}`);
    } catch (e) {
      Logger.error(e);
    }
  }
}
