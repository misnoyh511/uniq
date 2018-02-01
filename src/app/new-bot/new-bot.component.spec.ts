import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBotComponent } from './new-bot.component';

describe('NewBotComponent', () => {
  let component: NewBotComponent;
  let fixture: ComponentFixture<NewBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
