import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi from 'spotify-web-api-node';

@Injectable()
export class SpotifyService {
  public spotify: any;
  private readonly logger = new Logger(SpotifyService.name);

  constructor(private readonly configService: ConfigService) {
    this.spotify = new SpotifyWebApi({
      clientId: this.configService.get('spotify.clientId'),
      clientSecret: this.configService.get('spotify.secret'),
    });
    this.auth();
  }

  private async auth() {
    try {
      const auth = await this.spotify.clientCredentialsGrant();
      this.spotify.setAccessToken(auth.body.access_token);
      this.logger.debug(`The access token expires in ${auth.body.expires_in}`);
      this.logger.debug(`The access token is ${auth.body.access_token}`);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
