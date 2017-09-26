import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClicktoarrayComponent } from './clicktoarray.component';

describe('ClicktoarrayComponent', () => {
  let component: ClicktoarrayComponent;
  let fixture: ComponentFixture<ClicktoarrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClicktoarrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClicktoarrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
