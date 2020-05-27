import {fakeAsync, flushMicrotasks, flush, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { YaTranslateService } from './ya-translate.service';

describe('YaTranslateService', () => {
    let service: YaTranslateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientModule ],
            providers: [ HttpClient ]
        });
        service = TestBed.inject(YaTranslateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
