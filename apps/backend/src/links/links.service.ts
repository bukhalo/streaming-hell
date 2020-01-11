import { Injectable, Logger } from '@nestjs/common';
import { SonglinkService } from '../songlink/songlink.service';
import { Links } from './models/links.model';
// import { LinksInput } from './dto/links.input';

@Injectable()
export class LinksService {
  constructor(private readonly songlink: SonglinkService) {}

  async getLinks(url: string, userCountry: string): Promise<Links> {
    try {
      // @ts-ignore
      const req = await this.songlink.links(url)
      return req;
    } catch(e) {
      Logger.error(e);
    }
  }
}
