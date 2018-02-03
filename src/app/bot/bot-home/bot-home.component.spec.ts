import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { botHomeComponent } from './bot-home.component';

describe('botHomeComponent', () => {
  let component: botHomeComponent;
  let fixture: ComponentFixture<botHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ botHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(botHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
