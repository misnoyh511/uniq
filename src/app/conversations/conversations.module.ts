import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {TopMessagesInComponent} from './top-messages-in/top-messages-in.component';
import { TopMessagesOutComponent } from './top-messages-out/top-messages-out.component';
import { TranscriptsComponent, ArraySortPipe } from './transcripts/transcripts.component';
import {ConversationsRoutes} from './conversations.routing';
import {SharedModule} from '../shared/shared.module';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    RouterModule.forChild(ConversationsRoutes),
    SharedModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  declarations: [TopMessagesInComponent, TopMessagesOutComponent, TranscriptsComponent, SubNavComponent, ArraySortPipe]
})

export class ConversationsModule {
}
