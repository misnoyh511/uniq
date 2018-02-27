
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {NewBotComponent, JazzDialog, PizzaPartyComponent} from './new-bot.component';
import { NewBotRoutes} from './new-bot.routing';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        RouterModule.forChild(NewBotRoutes),
        SharedModule,
        CommonModule,
        FormsModule,
        MatTooltipModule
    ],
    declarations: [NewBotComponent, JazzDialog, PizzaPartyComponent],
    entryComponents: [JazzDialog, PizzaPartyComponent],
})

export class NewBotModule {
}
