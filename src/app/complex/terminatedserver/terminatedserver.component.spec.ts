import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminatedserverComponent } from './terminatedserver.component';

describe('TerminatedserverComponent', () => {
  let component: TerminatedserverComponent;
  let fixture: ComponentFixture<TerminatedserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminatedserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminatedserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
