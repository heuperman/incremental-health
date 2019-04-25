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
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { SelfCareListComponent } from './self-care-list/self-care-list.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { SideHustlesListComponent } from './side-hustles-list/side-hustles-list.component';
import { UpgradesListComponent } from './upgrades-list/upgrades-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BurnoutBarComponent } from './burnout-bar/burnout-bar.component';
import { VictoryDialogComponent } from './victory-dialog/victory-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    SelfCareListComponent,
    TitleBarComponent,
    SideHustlesListComponent,
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
    MatDialogModule,
    FlexLayoutModule,
    MatTabsModule,
    LayoutModule
  ],
  entryComponents: [
    VictoryDialogComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
