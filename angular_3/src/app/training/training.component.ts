import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from '../local-storage.service';

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

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css']
})

export class TrainingComponent implements OnInit {
    randObj: IArrayWords;
    word = '';
    errors = '';
    settings: ISettings;
    arrWordsAndTranslate: IArrayWords[] = [];

    answer = new FormControl(null, [
        Validators.required
    ]);

    constructor(
        private localStorageService: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(this.route.snapshot.data.title);
        this.localStorageService.setDefaultDataSetting();
        if (this.localStorageService.checkDataTranslate()){
            this.settings = this.localStorageService.getSetting();
            this.arrWordsAndTranslate = this.localStorageService.get();
            this.randObj = this.randomItem(this.arrWordsAndTranslate);
            console.log('Подсказка:', this.randObj);
            if (this.settings.lang === 'en'){
                this.word = this.randObj.en;
            }else {
                this.word = this.randObj.ru;
            }
        }else{
            this.router.navigate(['/']);
        }
    }

    next(): void {

        if (this.answer.value.toLowerCase() === this.randObj[this.settings.answer_lang].toLowerCase()){
            this.errors = '';
            this.answer.setValue('');
            this.randObj = this.randomItem(this.arrWordsAndTranslate);
            console.log('Подсказка:', this.randObj);
            this.word = this.randObj[this.settings.lang];
        }else{
            this.errors = 'Your answer is wrong';
        }
    }
    randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}
