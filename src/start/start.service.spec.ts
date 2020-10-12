import { Test, TestingModule } from '@nestjs/testing';
import { StartService } from './start.service';

describe('StartService', () => {
  let service: StartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartService],
    }).compile();

    service = module.get<StartService>(StartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
