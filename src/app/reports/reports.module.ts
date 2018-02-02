import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AnalyticsComponent} from './analytics/analytics.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ServiceKpiComponent } from './service-kpi/service-kpi.component';
import {ReportsRoutes} from './reports.routing';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    RouterModule.forChild(ReportsRoutes),
    SharedModule
  ],
  declarations: [AnalyticsComponent, FeedbackComponent, ServiceKpiComponent]
})

export class ReportsModule {
}
