import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceKpiComponent } from './service-kpi.component';

describe('ServiceKpiComponent', () => {
  let component: ServiceKpiComponent;
  let fixture: ComponentFixture<ServiceKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
