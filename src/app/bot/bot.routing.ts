import {Routes} from '@angular/router';
import { BotHomeComponent } from './bot-home/bot-home.component';
import { BotConfigurationComponent } from './bot-configuration/bot-configuration.component';
import { BotInstallationComponent } from './bot-installation/bot-installation.component';
import { BotLookFeelComponent } from './bot-look-feel/bot-look-feel.component';
import { BotModulesComponent } from './bot-modules/bot-modules.component';
import {BotPreviewComponent} from './bot-preview/bot-preview.component';
import {AuthGuard} from '../auth-guard/auth-guard.middleware';

export const botRoutes: Routes = [
  {
    path: 'bot-home',
    component: BotHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bot-configuration',
    component: BotConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bot-installation',
    component: BotInstallationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bot-look-feel',
    component: BotLookFeelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modules',
    component: BotModulesComponent,
    canActivate: [AuthGuard]
  },
    {
        path: 'bot-preview/:id',
        component: BotPreviewComponent,
        canActivate: [AuthGuard]
    }
];
