import {Routes} from '@angular/router';
import {AnalyticsComponent} from './analytics/analytics.component';
import {ServiceKpiComponent} from './service-kpi/service-kpi.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {AuthGuard} from '../auth-guard/auth-guard.middleware';
import {AppConfig} from '../app.config';

export const ReportsRoutes: Routes = [
  {
    path: AppConfig.MODULE_NAME[2] + '/analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: AppConfig.MODULE_NAME[2] + '/service-kpi',
    component: ServiceKpiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: AppConfig.MODULE_NAME[2] + '/feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  }
];
