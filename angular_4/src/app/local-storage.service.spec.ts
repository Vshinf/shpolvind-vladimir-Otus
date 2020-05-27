import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

interface ISettings {
    lang: string;
    answer_lang: string;
    num: string;
}

interface IArrayWords {
    ru?: string;
    en?: string;
    date?: string;
}

describe('LocalStorageService', () => {
    let service: LocalStorageService;
    const mockSetting = {lang: 'en', answer_lang: 'ru', num: '1'};
    const answer = JSON.stringify(mockSetting);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocalStorageService]
        });
        service = TestBed.inject(LocalStorageService);
    });

    beforeEach(() => {
        let store = {};
        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
            removeItem: (key: string) => {
                delete store[key];
            },
            clear: () => {
                store = {};
            }
        };

        spyOn(localStorage, 'getItem')
            .and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem')
            .and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem')
            .and.callFake(mockLocalStorage.removeItem);
        spyOn(localStorage, 'clear')
            .and.callFake(mockLocalStorage.clear);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('saveSetting', () => {
        it('should store the setting in localStorage', () => {
            service.saveSetting(mockSetting);
            expect(localStorage.getItem('settings')).toEqual(answer);
        });
    });
    describe('getSetting', () => {
        it('should return stored setting from localStorage', () => {
            expect(service.getSetting()).toEqual(mockSetting);
        });
    });
});
