import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { OdesliModule } from '../providers/odesli/odesli.module';
import { ShazamModule } from '../providers/shazam/shazam.module';
import { VkModule } from '../providers/vk/vk.module';
import { LinksService } from './links.service';

describe('LinksService', () => {
  let service: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, OdesliModule, ShazamModule, VkModule],
      providers: [LinksService],
    }).compile();

    service = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
