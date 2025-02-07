import { Test, TestingModule } from '@nestjs/testing';
import { PopularEventsService } from './popular-events.service';

describe('PopularEventsService', () => {
  let service: PopularEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopularEventsService],
    }).compile();

    service = module.get<PopularEventsService>(PopularEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
