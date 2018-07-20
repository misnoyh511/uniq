import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AnalyticsComponent} from './analytics/analytics.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ServiceKpiComponent } from './service-kpi/service-kpi.component';
import {ReportsRoutes} from './reports.routing';
import {SharedModule} from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  imports: [
    RouterModule.forChild(ReportsRoutes),
    SharedModule,
    MatTooltipModule
  ],
  declarations: [AnalyticsComponent, FeedbackComponent, ServiceKpiComponent]
})

export class ReportsModule {
}
