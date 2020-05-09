import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { RecentlyAddedComponent } from './recently-added/recently-added.component';
import { TrainingComponent } from './training/training.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule }   from '@angular/common/http';

const appRoutes: Routes =[
    { path: '', component: RecentlyAddedComponent},
    { path: 'training', component: TrainingComponent},
    { path: 'setting', component: SettingsComponent},
    { path: '**', component: NotFoundComponent }
];

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
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
