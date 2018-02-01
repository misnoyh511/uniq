
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NewBotComponent} from './new-bot.component';
import { NewBotRoutes} from './new-bot.routing';
import {SharedModule} from "../shared/shared.module";


@NgModule({
    imports: [
        RouterModule.forChild(NewBotRoutes),
        SharedModule
    ],
    declarations: [NewBotComponent]
})

export class NewBotModule {}