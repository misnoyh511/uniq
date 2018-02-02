import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMessagesOutComponent } from './top-messages-out.component';

describe('TopMessagesOutComponent', () => {
  let component: TopMessagesOutComponent;
  let fixture: ComponentFixture<TopMessagesOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMessagesOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMessagesOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
