import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TribusComponent } from './tribus.component';

describe('TribusComponent', () => {
  let component: TribusComponent;
  let fixture: ComponentFixture<TribusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TribusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
