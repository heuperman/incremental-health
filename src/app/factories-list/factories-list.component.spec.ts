import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoriesListComponent } from './factories-list.component';
import {AppComponent} from '../app.component';
import {SelfCareListComponent} from '../self-care-list/self-care-list.component';
import {TitleBarComponent} from '../title-bar/title-bar.component';
import {UpgradesListComponent} from '../upgrades-list/upgrades-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';

describe('FactoriesListComponent', () => {
  let component: FactoriesListComponent;
  let fixture: ComponentFixture<FactoriesListComponent>;

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
    fixture = TestBed.createComponent(FactoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
