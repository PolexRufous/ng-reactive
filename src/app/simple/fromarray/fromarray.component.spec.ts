import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromarrayComponent } from './fromarray.component';

describe('FromarrayComponent', () => {
  let component: FromarrayComponent;
  let fixture: ComponentFixture<FromarrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromarrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromarrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
