import { Injectable } from '@angular/core';

interface IArrayWords {
    ru?: string;
    en?: string;
    date?: string;
}
interface ISettings {
    lang: string;
    answer_lang: string;
    num: string;
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    defSetting = {lang: 'en', answer_lang: 'ru', num: '1'};
    defTranslate = [];

    constructor() { }

    save(obj: IArrayWords[]): void {
        localStorage.setItem('translate', JSON.stringify(obj));
    }
    saveSetting(obj: ISettings): void {
        localStorage.setItem('settings', JSON.stringify(obj));
    }
    get(): IArrayWords[] {
        return JSON.parse(localStorage.getItem('translate') || JSON.stringify(this.defTranslate));
    }
    getSetting(): ISettings {
        return JSON.parse(localStorage.getItem('settings') || JSON.stringify(this.defSetting));
    }
    checkDataTranslate(): boolean {
        if ( localStorage.getItem('translate') ){
            return true;
        }
        return false;
    }
    setDefaultDataSetting() {
        const defSettings = { lang: 'en', answer_lang: 'ru', num: '1' };
        if ( !localStorage.getItem('settings') ){
            localStorage.setItem('settings', JSON.stringify(defSettings));
        }
    }
}
