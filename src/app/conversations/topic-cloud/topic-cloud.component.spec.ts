import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCloudComponent } from './topic-cloud.component';

describe('TopicCloudComponent', () => {
  let component: TopicCloudComponent;
  let fixture: ComponentFixture<TopicCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
