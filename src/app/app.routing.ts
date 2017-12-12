import {Routes} from '@angular/router';

import {AuthenticationRoutes} from './authentication/authentication.routing';
import {DashboardRoutes} from './dashboard/dashboard.routing';

export const AppRoutes: Routes = [
    ...AuthenticationRoutes,
    ...DashboardRoutes
];
