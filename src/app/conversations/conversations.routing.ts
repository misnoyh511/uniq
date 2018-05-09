import {Routes} from '@angular/router';
import {TranscriptsComponent} from './transcripts/transcripts.component';
import {TopicCloudComponent} from './topic-cloud/topic-cloud.component';
import {TopMessagesInComponent} from './top-messages-in/top-messages-in.component';
import {TopMessagesOutComponent} from './top-messages-out/top-messages-out.component';
import {AuthGuard} from '../auth-guard/auth-guard.middleware';
import {AppConfig} from '../app.config';
import * as firebase from 'firebase';
import App = firebase.app.App;

export const ConversationsRoutes: Routes = [
  {
    path: AppConfig.MODULE_NAME[1] + '/transcripts',
    component: TranscriptsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: AppConfig.MODULE_NAME[1] + '/top-messages-in',
    component: TopMessagesInComponent,
    canActivate: [AuthGuard]
  },
  {
    path: AppConfig.MODULE_NAME[1] + '/top-messages-out',
    component: TopMessagesOutComponent,
    canActivate: [AuthGuard]
  },
    {
      path: AppConfig.MODULE_NAME[1] + '/topic-cloud',
        component: TopicCloudComponent,
        canActivate: [AuthGuard]
    }
];
