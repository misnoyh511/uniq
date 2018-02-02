import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMessagesInComponent } from './top-messages-in.component';

describe('TopMessagesInComponent', () => {
  let component: TopMessagesInComponent;
  let fixture: ComponentFixture<TopMessagesInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMessagesInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMessagesInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
