import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    arrNumWords = [5, 10, 15, 20];
    arrLangs = [ 'English' ];
    constructor() { }

    save(): void {
        console.log('save');
    }
    back(): void {
        console.log('back');
    }
}
