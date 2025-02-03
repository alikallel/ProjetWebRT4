import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventComponent } from './my-event.component';

describe('MyEventComponent', () => {
  let component: MyEventComponent;
  let fixture: ComponentFixture<MyEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyEventComponent]
    });
    fixture = TestBed.createComponent(MyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
