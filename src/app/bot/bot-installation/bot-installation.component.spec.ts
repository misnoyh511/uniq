import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { botInstallationComponent } from './bot-installation.component';

describe('botInstallationComponent', () => {
  let component: botInstallationComponent;
  let fixture: ComponentFixture<botInstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ botInstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(botInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
