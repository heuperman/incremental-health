import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurnoutBarComponent } from './burnout-bar.component';

describe('BurnoutBarComponent', () => {
  let component: BurnoutBarComponent;
  let fixture: ComponentFixture<BurnoutBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurnoutBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurnoutBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
