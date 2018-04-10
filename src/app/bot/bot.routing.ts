import {Routes} from '@angular/router';
import { botHomeComponent } from './bot-home/bot-home.component';
import { botConfigurationComponent } from './bot-configuration/bot-configuration.component';
import { botInstallationComponent } from './bot-installation/bot-installation.component';
import { botLookFeelComponent } from './bot-look-feel/bot-look-feel.component';
import { botModulesComponent } from './bot-modules/bot-modules.component';
import {BotPreviewComponent} from './bot-preview/bot-preview.component';
import {AuthGuard} from '../auth-guard/auth-guard.middleware';

export const botRoutes: Routes = [
  {
    path: 'bot-home',
    component: botHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bot-configuration',
    component: botConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bot-installation',
    component: botInstallationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bot-look-feel',
    component: botLookFeelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bot-modules',
    component: botModulesComponent,
    canActivate: [AuthGuard]
  },
    {
        path: 'bot-preview/:id',
        component: BotPreviewComponent,
        canActivate: [AuthGuard]
    }
];
