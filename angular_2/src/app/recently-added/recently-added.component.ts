import { Component, OnInit } from '@angular/core';

import { YaTranslateService } from '../ya-translate.service';
import { SpliterService } from '../spliter.service';
import { LocalStorageService } from '../local-storage.service';

interface IArrayWords {
    ru: string;
    en: string;
    date: string;
}

@Component({
    selector: 'app-recently-added',
    templateUrl: './recently-added.component.html',
    styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

    showBlAddWord = false;
    showBtn = true;

    arrWordsAndTranslate: IArrayWords[] = [];

    constructor( private yaTranslateService: YaTranslateService,
                 private localStorageService: LocalStorageService,
                 private spliterService: SpliterService ) { }

    ngOnInit(): void {
        this.arrWordsAndTranslate = this.localStorageService.get();
    }

    showBlockAdd(): void {
        this.showBlAddWord = true;
        this.showBtn = false;
    }

    addNewWord(word: string): void {
        this.showBlAddWord = false;
        this.showBtn = true;
        this.spliterService.spliter(word).subscribe( data => {
            // console.log('|' + data + '|');
            this.yaTranslateService.translateWord(data).subscribe(res => {
                console.log('Translate: ', res);
                this.arrWordsAndTranslate.push(
                    {
                        ru: data,
                        en: res,
                        date: Date.now().toString(),
                    }
                );
                this.localStorageService.save(this.arrWordsAndTranslate);
            });
        });
    }
}
