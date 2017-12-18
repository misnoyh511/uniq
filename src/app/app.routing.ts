import {Routes} from '@angular/router';

import {AuthenticationRoutes} from './authentication/authentication.routing';
import {DashboardRoutes} from './dashboard/dashboard.routing';
import {PublicRoutes} from './public/public.routing';
import {GetStartedRoutes} from './get-started/get-started.routing';

export const AppRoutes: Routes = [
    ...AuthenticationRoutes,
    ...DashboardRoutes,
    ...PublicRoutes,
    ...GetStartedRoutes,
    {
        path: '',
        redirectTo:'/home',
        pathMatch : 'full'
    }
];
