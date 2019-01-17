import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradesListComponent } from './upgrades-list.component';

describe('UpgradesListComponent', () => {
  let component: UpgradesListComponent;
  let fixture: ComponentFixture<UpgradesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
