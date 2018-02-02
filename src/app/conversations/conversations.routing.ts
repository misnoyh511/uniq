import {Routes} from '@angular/router';
import {TranscriptsComponent} from './transcripts/transcripts.component';
import {TopMessagesInComponent} from './top-messages-in/top-messages-in.component';
import {TopMessagesOutComponent} from './top-messages-out/top-messages-out.component';
import {AuthGuard} from "../auth-guard/auth-guard.middleware";

export const ConversationsRoutes:Routes = [
  {
    path: 'transcripts',
    component: TranscriptsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'top-messages-in',
    component: TopMessagesInComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'top-messages-out',
    component: TopMessagesOutComponent,
    canActivate: [AuthGuard]
  }
];
