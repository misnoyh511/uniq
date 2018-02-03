import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { botLookFeelComponent } from './bot-look-feel.component';

describe('botLookFeelComponent', () => {
  let component: botLookFeelComponent;
  let fixture: ComponentFixture<botLookFeelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ botLookFeelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(botLookFeelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
