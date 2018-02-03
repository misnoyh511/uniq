import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { botConfigurationComponent } from './bot-configuration.component';

describe('botConfigurationComponent', () => {
  let component: botConfigurationComponent;
  let fixture: ComponentFixture<botConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ botConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(botConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
