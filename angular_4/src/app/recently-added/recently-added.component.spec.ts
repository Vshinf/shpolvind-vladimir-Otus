import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { RecentlyAddedComponent } from './recently-added.component';
import { TabsComponent } from '../tabs/tabs.component';

describe('RecentlyAddedComponent', () => {
    let component: RecentlyAddedComponent;
    let fixture: ComponentFixture<RecentlyAddedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RecentlyAddedComponent,
                TabsComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecentlyAddedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });
});
