import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServereventComponent } from './serverevent.component';

describe('ServereventComponent', () => {
  let component: ServereventComponent;
  let fixture: ComponentFixture<ServereventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServereventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServereventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
