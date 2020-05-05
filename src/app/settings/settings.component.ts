import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    save(): void {
        console.log('save');
    }
    back(): void {
        console.log('back');
    }
}
