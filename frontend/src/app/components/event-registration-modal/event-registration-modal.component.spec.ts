import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationModalComponent } from './event-registration-modal.component';

describe('EventRegistrationModalComponent', () => {
  let component: EventRegistrationModalComponent;
  let fixture: ComponentFixture<EventRegistrationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventRegistrationModalComponent]
    });
    fixture = TestBed.createComponent(EventRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
