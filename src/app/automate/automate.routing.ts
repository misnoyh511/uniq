import {Routes} from '@angular/router';
import {SetupAiComponent} from './setup-ai/setup-ai.component';
import { SetupAiQuestionsComponent } from './setup-ai-questions/setup-ai-questions.component';
import {AuthGuard} from '../auth-guard/auth-guard.middleware';
import {AppConfig} from '../app.config';

export const AutomateRoutes:Routes = [
  {
    path: AppConfig.MODULE_NAME[0] + '/setup-ai',
    component: SetupAiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: AppConfig.MODULE_NAME[0] + '/setup-ai-questions',
    component: SetupAiQuestionsComponent,
    canActivate: [AuthGuard]
  }
];
