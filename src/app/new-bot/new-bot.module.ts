
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NewBotComponent, JazzDialog} from './new-bot.component';
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
    declarations: [NewBotComponent, JazzDialog],
    entryComponents: [JazzDialog],
})

export class NewBotModule {
}
