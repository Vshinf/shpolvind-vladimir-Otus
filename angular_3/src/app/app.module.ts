import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common'; // для даты
import LocaleRu from '@angular/common/locales/ru'; // для даты

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { RecentlyAddedComponent } from './recently-added/recently-added.component';
import { TrainingComponent } from './training/training.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes =[
    { path: '', component: RecentlyAddedComponent, data: { title: 'Recently and Added' }},
    { path: 'training', component: TrainingComponent, data: { title: 'Training' }},
    { path: 'setting', component: SettingsComponent, data: { title: 'Setting' }},
    { path: '**', component: NotFoundComponent, data: { title: 'Page not found' }}
];

registerLocaleData(LocaleRu, 'ru'); // для даты

@NgModule({
    declarations: [
        AppComponent,
        TabsComponent,
        RecentlyAddedComponent,
        TrainingComponent,
        SettingsComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
