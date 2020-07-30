import { TestBed } from '@angular/core/testing';

import { RealtimeDatabaseService } from './realtime-database.service';

describe('RealtimeDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealtimeDatabaseService = TestBed.get(RealtimeDatabaseService);
    expect(service).toBeTruthy();
  });
});
