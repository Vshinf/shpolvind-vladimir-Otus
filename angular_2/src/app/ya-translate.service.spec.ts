import { TestBed } from '@angular/core/testing';

import { YaTranslateService } from './ya-translate.service';

describe('YaTranslateService', () => {
  let service: YaTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YaTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
