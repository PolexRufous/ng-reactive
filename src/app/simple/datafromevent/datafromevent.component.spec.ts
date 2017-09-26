import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafromeventComponent } from './datafromevent.component';

describe('DatafromeventComponent', () => {
  let component: DatafromeventComponent;
  let fixture: ComponentFixture<DatafromeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafromeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafromeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
