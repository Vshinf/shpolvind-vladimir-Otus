import { TestBed } from '@angular/core/testing';

import { LastAddedService } from './last-added.service';

describe('LastAddedService', () => {
  let service: LastAddedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastAddedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
