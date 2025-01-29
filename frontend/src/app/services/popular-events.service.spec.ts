import { TestBed } from '@angular/core/testing';

import { PopularEventsService } from './popular-events.service';

describe('PopularEventsService', () => {
  let service: PopularEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
