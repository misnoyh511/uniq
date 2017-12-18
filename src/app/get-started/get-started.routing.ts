import {Routes} from '@angular/router';
import {GetStartedComponent} from './get-started.component';
import {AuthGuard} from '../auth-guard/auth-guard.middleware';

export const GetStartedRoutes: Routes = [
    {
        path: 'get-started',
        component: GetStartedComponent,
        canActivate: [AuthGuard]
    },
];
