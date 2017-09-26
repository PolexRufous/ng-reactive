import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickeventComponent } from './clickevent.component';

describe('ClickeventComponent', () => {
  let component: ClickeventComponent;
  let fixture: ComponentFixture<ClickeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
