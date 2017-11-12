import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeatherComponent } from './leather.component';

describe('LeatherComponent', () => {
  let component: LeatherComponent;
  let fixture: ComponentFixture<LeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
