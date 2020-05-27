import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { YaTranslateService } from '../ya-translate.service';
import { SpliterService } from '../spliter.service';
import { LocalStorageService } from '../local-storage.service';
import { LastAddedService } from '../last-added.service';


interface IArrayWords {
    ru?: string;
    en?: string;
    date?: string;
}

@Component({
    selector: 'app-recently-added',
    templateUrl: './recently-added.component.html',
    styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

    showBlAddWord = false;
    showBtn = true;
    showListWord = false;

    dateAdd: Date;

    arrWordsAndTranslate: IArrayWords[] = [];
    lastArrWordsAndTranslate: IArrayWords[] = [];

    inpAdd = new FormControl(null, [
        Validators.required
    ]);

    constructor(
        private yaTranslateService: YaTranslateService,
        private localStorageService: LocalStorageService,
        private spliterService: SpliterService,
        private lastAddedService: LastAddedService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(this.route.snapshot.data.title);
        this.arrWordsAndTranslate = this.localStorageService.get();
        if ( JSON.stringify(this.arrWordsAndTranslate) !== '[]' ){
            this.showListWord = true;
            this.lastAddedService.getLast().subscribe(
                res => {
                    this.lastArrWordsAndTranslate.push(res);
                    this.dateAdd = new Date(Number(res.date));
                }
            );
        }
    }

    showBlockAdd(): void {
        this.showBlAddWord = true;
        this.showBtn = false;
    }

    addNewWord(): void {
        console.log('Input errors', this.inpAdd.errors);
        this.showBlAddWord = false;
        this.showBtn = true;
        this.showListWord = true;
        this.spliterService.spliter(this.inpAdd.value).subscribe( data => {
            this.inpAdd.setValue('');
            this.yaTranslateService.translateWord(data).subscribe(res => {
                console.log('Translate: ', res);
                const date = new Date();
                date.setHours(0, 0, 0, 0);
                const today = date.getTime();

                const objAdd = {
                    ru: data,
                    en: res,
                    date: today.toString(),
                };
                console.log(this.arrWordsAndTranslate);
                this.arrWordsAndTranslate.push(objAdd);
                this.lastArrWordsAndTranslate.push(objAdd);
                this.localStorageService.save(this.arrWordsAndTranslate);
            });
        });
    }
}
