import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCareListComponent } from './self-care-list.component';

describe('SelfCareListComponent', () => {
  let component: SelfCareListComponent;
  let fixture: ComponentFixture<SelfCareListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfCareListComponent ]
    })
    .compileComponents();
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
