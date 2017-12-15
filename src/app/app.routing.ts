import {Routes} from '@angular/router';

import {AuthenticationRoutes} from './authentication/authentication.routing';
import {DashboardRoutes} from './dashboard/dashboard.routing';
import {PublicRoutes} from './public/public.routing';

export const AppRoutes: Routes = [
    ...AuthenticationRoutes,
    ...DashboardRoutes,
    ...PublicRoutes,
    {
        path: '',
        redirectTo:'/login',
        pathMatch : 'full'
    }
];
