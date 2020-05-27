import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LocalStorageService } from '../local-storage.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    arrNumWords = [1, 2, 3, 4];
    arrLangs = [ 'English', 'Russia' ];
    arrOpLangs = [ 'en', 'ru' ];

    lang: FormControl;
    answerLang: string;
    numWords: FormControl;

    constructor(
        private localStorageService: LocalStorageService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(this.route.snapshot.data.title);
        this.localStorageService.setDefaultDataSetting();
        const setting = this.localStorageService.getSetting();
        let lang = 'en';
        let answerLang = 'ru';
        let num = '1';
        if (JSON.stringify(setting) !== '{}'){
            lang = setting.lang;
            answerLang = setting.answer_lang;
            num = setting.num;
        }
        this.lang = new FormControl(lang);
        this.answerLang = this.otherLang(lang);
        this.numWords = new FormControl(num);
    }

    save(): void {
        this.localStorageService.saveSetting(
            {
                lang: this.lang.value,
                answer_lang: this.otherLang(this.lang.value),
                num: this.numWords.value
            }
        );
        // console.log('save', {lang: this.lang.value, answer_lang: this.otherLang(this.lang.value), num: this.numWords.value});
    }
    back(): void {
        this.location.back();
    }
    otherLang(lang: string): string {
        let newArrOpLangs = this.arrOpLangs;
        newArrOpLangs = newArrOpLangs.filter(item => item !== lang);
        return newArrOpLangs[0];
    }
}
