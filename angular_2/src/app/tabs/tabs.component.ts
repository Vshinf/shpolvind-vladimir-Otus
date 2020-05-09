import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
    @Input() pTab1?: string;
    @Input() pTab2?: string;
    @Input() pTab3?: string;

    constructor() { }
}
