import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatListModule,
  MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';
import { SelfCareListComponent } from './self-care-list/self-care-list.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { FactoriesListComponent } from './factories-list/factories-list.component';
import { UpgradesListComponent } from './upgrades-list/upgrades-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BurnoutBarComponent } from './burnout-bar/burnout-bar.component';
import { VictoryDialogComponent } from './victory-dialog/victory-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SelfCareListComponent,
    TitleBarComponent,
    FactoriesListComponent,
    UpgradesListComponent,
    BurnoutBarComponent,
    VictoryDialogComponent,
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
    MatDialogModule
  ],
  entryComponents: [
    VictoryDialogComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
