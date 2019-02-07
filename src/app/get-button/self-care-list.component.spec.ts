import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCareListComponent } from './self-care-list.component';
import {AppComponent} from '../app.component';
import {TitleBarComponent} from '../title-bar/title-bar.component';
import {FactoriesListComponent} from '../factories-list/factories-list.component';
import {UpgradesListComponent} from '../upgrades-list/upgrades-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';

describe('SelfCareListComponent', () => {
  let component: SelfCareListComponent;
  let fixture: ComponentFixture<SelfCareListComponent>;

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
    fixture = TestBed.createComponent(SelfCareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
