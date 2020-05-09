import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
const yaApiKey = 'trnsl.1.1.20200506T170530Z.4d31f421aaf7ded8.5bd6457080fa90871fc59463b0ae132ff37d6bf8';

interface IResponsYaApi {
    code: number;
    lang: string;
    text: string[];
}

@Injectable({
    providedIn: 'root'
})
export class YaTranslateService {

    constructor(private http: HttpClient) { }

    translateWord(word: string): Observable<any> {
        return this.http.get<IResponsYaApi>(url, {
            params: {
                key: yaApiKey,
                text: word,
                lang: 'ru-en',
                format: 'plain',
            }
        }).pipe(map(data => {
            // console.log(typeof data);
            // console.log(data);
            return data.text[0];
        }));
    }
}
