import {Routes} from '@angular/router';
import {AccountSettingsComponent} from './account-settings.component';
import {AuthGuard} from "../auth-guard/auth-guard.middleware";

export const AccountSettingsRoutes:Routes = [
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard]
  },
];
