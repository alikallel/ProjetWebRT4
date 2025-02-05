import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipPaymentsComponent } from './sponsorship-payments.component';

describe('SponsorshipPaymentsComponent', () => {
  let component: SponsorshipPaymentsComponent;
  let fixture: ComponentFixture<SponsorshipPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorshipPaymentsComponent]
    });
    fixture = TestBed.createComponent(SponsorshipPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
