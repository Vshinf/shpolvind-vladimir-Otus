import { Injectable } from '@angular/core';

import {from, Observable} from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SpliterService {

    constructor( ) { }

    spliter(text: string): Observable<any> {
        const massTranslate = text.split(';');
        return from(massTranslate).pipe(
            filter(data => data !== ''),
            filter(data => data !== ' '),
            map(data => {
                return data.trim();
            })
        );
    }
}
