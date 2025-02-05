import { TestBed } from '@angular/core/testing';

import { SponsoredEventsService } from './sponsored-events.service';

describe('SponsoredEventsService', () => {
  let service: SponsoredEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsoredEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
