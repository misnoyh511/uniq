import {Routes} from '@angular/router';

import {AuthenticationRoutes} from './authentication/authentication.routing';
import {DashboardRoutes} from './dashboard/dashboard.routing';
import {PublicRoutes} from './public/public.routing';
import {GetStartedRoutes} from './get-started/get-started.routing';
import {NewBotRoutes} from './new-bot/new-bot.routing';
import {AutomateRoutes} from './automate/automate.routing';
import {ConversationsRoutes} from './conversations/conversations.routing';
import {ReportsRoutes} from './reports/reports.routing';
import {AccountSettingsRoutes} from './account-settings/account-settings.routing';
import {botRoutes} from './bot/bot.routing';

export const AppRoutes: Routes = [
  ...AuthenticationRoutes,
  ...DashboardRoutes,
  ...PublicRoutes,
  ...GetStartedRoutes,
  ...NewBotRoutes,
  ...AutomateRoutes,
  ...ConversationsRoutes,
  ...ReportsRoutes,
  ...AccountSettingsRoutes,
  ...botRoutes,
  {
    path: '',
    redirectTo: '/get-started',
    pathMatch: 'full'
  }
];
