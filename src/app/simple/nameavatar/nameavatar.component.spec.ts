import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameavatarComponent } from './nameavatar.component';

describe('NameavatarComponent', () => {
  let component: NameavatarComponent;
  let fixture: ComponentFixture<NameavatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameavatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameavatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
