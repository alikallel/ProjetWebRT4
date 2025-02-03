import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularEventsComponent } from './popular-events.component';

describe('PopularEventsComponent', () => {
  let component: PopularEventsComponent;
  let fixture: ComponentFixture<PopularEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularEventsComponent]
    });
    fixture = TestBed.createComponent(PopularEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
