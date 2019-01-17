import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoriesListComponent } from './factories-list.component';

describe('FactoriesListComponent', () => {
  let component: FactoriesListComponent;
  let fixture: ComponentFixture<FactoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoriesListComponent ]
    })
    .compileComponents();
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
