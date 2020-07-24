import { TestBed } from '@angular/core/testing';

import { ErrordialogserviceService } from './errordialogservice.service';

describe('ErrordialogserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrordialogserviceService = TestBed.get(ErrordialogserviceService);
    expect(service).toBeTruthy();
  });
});
