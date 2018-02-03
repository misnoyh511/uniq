import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { botModulesComponent } from './bot-modules.component';

describe('botModulesComponent', () => {
  let component: botModulesComponent;
  let fixture: ComponentFixture<botModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ botModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(botModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
