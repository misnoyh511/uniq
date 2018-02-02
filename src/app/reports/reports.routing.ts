import {Routes} from '@angular/router';
import {AnalyticsComponent} from './analytics/analytics.component';
import {ServiceKpiComponent} from './service-kpi/service-kpi.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {AuthGuard} from "../auth-guard/auth-guard.middleware";

export const ReportsRoutes:Routes = [
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'service-kpi',
    component: ServiceKpiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  }
];
