import { Query, Resolver, Args } from '@nestjs/graphql';
import { LinksService } from './links.service';
import { Links } from './models/links.model';
// import { LinksInput } from './dto/links.input';

@Resolver(of => Links)
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @Query(returns => Links)
  async linksByUrl(
    @Args('url') url: string,
    @Args('userCountry') userCountry?: string
    ): Promise<Links> {
    const test = await this.linksService.getLinks(url, userCountry);
    console.log(test);
    // @ts-ignore
    return test.data;
  }
}
