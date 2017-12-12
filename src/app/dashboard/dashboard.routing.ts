import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../auth-guard/auth-guard.middleware';

export const DashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
];
