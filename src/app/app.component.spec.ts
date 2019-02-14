import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SelfCareListComponent} from './self-care-list/self-care-list.component';
import {TitleBarComponent} from './title-bar/title-bar.component';
import {FactoriesListComponent} from './factories-list/factories-list.component';
import {UpgradesListComponent} from './upgrades-list/upgrades-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SelfCareListComponent,
        TitleBarComponent,
        FactoriesListComponent,
        UpgradesListComponent
      ],
      imports: [
        BrowserModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatGridListModule,
        MatListModule,
        MatProgressBarModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
