import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupAiComponent } from './setup-ai.component.ts';

describe('SetupAiComponent', () => {
  let component: SetupAiComponent;
  let fixture: ComponentFixture<SetupAiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupAiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
