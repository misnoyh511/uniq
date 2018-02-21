import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AnalyticsComponent} from './analytics/analytics.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ServiceKpiComponent } from './service-kpi/service-kpi.component';
import {ReportsRoutes} from './reports.routing';
import {SharedModule} from '../shared/shared.module';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { Daterangepicker } from 'ng2-daterangepicker';


@NgModule({
  imports: [
    RouterModule.forChild(ReportsRoutes),
    SharedModule,
    Daterangepicker
  ],
  declarations: [AnalyticsComponent, FeedbackComponent, ServiceKpiComponent, SubNavComponent]
})

export class ReportsModule {
}
