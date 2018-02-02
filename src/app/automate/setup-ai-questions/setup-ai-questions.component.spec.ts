import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupAiQuestionsComponent } from './setup-ai-questions.component';

describe('SetupAiQuestionsComponent', () => {
  let component: SetupAiQuestionsComponent;
  let fixture: ComponentFixture<SetupAiQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupAiQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupAiQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
