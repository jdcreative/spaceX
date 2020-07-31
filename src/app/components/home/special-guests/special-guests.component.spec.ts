import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialGuestsComponent } from './special-guests.component';

describe('SpecialGuestsComponent', () => {
  let component: SpecialGuestsComponent;
  let fixture: ComponentFixture<SpecialGuestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialGuestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
