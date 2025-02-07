import { Test, TestingModule } from '@nestjs/testing';
import { PopularEventsController } from './popular-events.controller';

describe('PopularEventsController', () => {
  let controller: PopularEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopularEventsController],
    }).compile();

    controller = module.get<PopularEventsController>(PopularEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
