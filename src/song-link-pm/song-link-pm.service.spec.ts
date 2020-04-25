import { Test, TestingModule } from '@nestjs/testing';
import { SongLinkPmService } from './song-link-pm.service';

describe('SongLinkPmService', () => {
  let service: SongLinkPmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongLinkPmService],
    }).compile();

    service = module.get<SongLinkPmService>(SongLinkPmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
