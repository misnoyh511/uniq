import {Routes} from '@angular/router';
import {SetupAiComponent} from './setup-ai/setup-ai.component';
import { SetupAiQuestionsComponent } from './setup-ai-questions/setup-ai-questions.component';
import {AuthGuard} from "../auth-guard/auth-guard.middleware";

export const AutomateRoutes:Routes = [
  {
    path: 'setup-ai',
    component: SetupAiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'setup-ai-questions',
    component: SetupAiQuestionsComponent,
    canActivate: [AuthGuard]
  }
];
