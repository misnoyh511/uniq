import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SetupAiComponent} from './setup-ai/setup-ai.component';
import { SetupAiQuestionsComponent } from './setup-ai-questions/setup-ai-questions.component';
import {AutomateRoutes} from './automate.routing';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    RouterModule.forChild(AutomateRoutes),
    SharedModule
  ],
  declarations: [SetupAiComponent, SetupAiQuestionsComponent]
})

export class AutomateModule {
}
