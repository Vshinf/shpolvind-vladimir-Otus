import { Injectable } from '@angular/core';

interface IArrayWords {
    ru: string;
    en: string;
    date: string;
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    save(obj: IArrayWords[]): void {
        // console.log(obj);
        localStorage.setItem('translate', JSON.stringify(obj));
    }
    get(): IArrayWords[] {
        // console.log(obj);
        return JSON.parse(localStorage.getItem('translate') || '[]');
    }
}
