import { Injectable } from '@angular/core';

import {from, Observable} from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';

interface IArrayWords {
    ru?: string;
    en?: string;
    date?: string;
}

@Injectable({
    providedIn: 'root'
})
export class LastAddedService {

    constructor( private localStorageService: LocalStorageService ) { }

    thisDay( date, lastAddedDate ): boolean {
        if ( date === lastAddedDate ){
            return true;
        }
        return false;
    }

    getLast(): Observable<any> {
        const arrWordsAndTranslate: IArrayWords[] = this.localStorageService.get();
        const lastAddedDate = arrWordsAndTranslate[arrWordsAndTranslate.length - 1].date;

        return (from(arrWordsAndTranslate).pipe(
            filter(data => this.thisDay(data.date, lastAddedDate)),
            map(data => {
                return data;
            })
        ));
    }
}
