import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBarComponent } from './title-bar.component';
import {AppComponent} from '../app.component';
import {SelfCareListComponent} from '../get-button/self-care-list.component';
import {FactoriesListComponent} from '../factories-list/factories-list.component';
import {UpgradesListComponent} from '../upgrades-list/upgrades-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';

describe('TitleBarComponent', () => {
  let component: TitleBarComponent;
  let fixture: ComponentFixture<TitleBarComponent>;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
