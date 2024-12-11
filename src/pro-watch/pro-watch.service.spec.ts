import { Test, TestingModule } from '@nestjs/testing';
import { ProWatchService } from './pro-watch.service';

describe('ProWatchService', () => {
  let service: ProWatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProWatchService],
    }).compile();

    service = module.get<ProWatchService>(ProWatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
