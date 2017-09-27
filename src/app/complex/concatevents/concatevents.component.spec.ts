import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcateventsComponent } from './concatevents.component';

describe('ConcateventsComponent', () => {
  let component: ConcateventsComponent;
  let fixture: ComponentFixture<ConcateventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcateventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcateventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
