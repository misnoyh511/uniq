import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {TopMessagesInComponent} from './top-messages-in/top-messages-in.component';
import { TopMessagesOutComponent } from './top-messages-out/top-messages-out.component';
import { TranscriptsComponent } from './transcripts/transcripts.component';
import {ConversationsRoutes} from './conversations.routing';
import {SharedModule} from '../shared/shared.module';
import { SubNavComponent } from './sub-nav/sub-nav.component';

@NgModule({
  imports: [
    RouterModule.forChild(ConversationsRoutes),
    SharedModule
  ],
  declarations: [TopMessagesInComponent, TopMessagesOutComponent, TranscriptsComponent, SubNavComponent]
})

export class ConversationsModule {
}
