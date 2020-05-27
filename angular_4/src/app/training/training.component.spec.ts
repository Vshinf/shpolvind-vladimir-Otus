import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrainingComponent } from './training.component';
import { TabsComponent } from '../tabs/tabs.component';
import { LocalStorageService } from '../local-storage.service';

describe('TrainingComponent', () => {
    let component: TrainingComponent;
    let fixture: ComponentFixture<TrainingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TrainingComponent,
                TabsComponent
            ],
            imports: [
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                LocalStorageService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrainingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
