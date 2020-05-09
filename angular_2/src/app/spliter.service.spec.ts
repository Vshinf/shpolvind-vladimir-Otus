import { TestBed } from '@angular/core/testing';

import { SpliterService } from './spliter.service';

describe('SpliterService', () => {
  let service: SpliterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpliterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
