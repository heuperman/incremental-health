import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatToolbarModule
} from '@angular/material';
import { SelfCareListComponent } from './self-care-list/self-care-list.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { FactoriesListComponent } from './factories-list/factories-list.component';
import { UpgradesListComponent } from './upgrades-list/upgrades-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SelfCareListComponent,
    TitleBarComponent,
    FactoriesListComponent,
    UpgradesListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
