import { Test, TestingModule } from '@nestjs/testing';
import { SongLinkService } from './songlink.service';

describe('SongLinkService', () => {
  let service: SongLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongLinkService],
    }).compile();

    service = module.get<SongLinkService>(SongLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
