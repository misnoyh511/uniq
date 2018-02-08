
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {NewBotComponent, JazzDialog} from './new-bot.component';
import { NewBotRoutes} from './new-bot.routing';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [
        RouterModule.forChild(NewBotRoutes),
        SharedModule,
        CommonModule,
        FormsModule
    ],
    declarations: [NewBotComponent, JazzDialog],
    entryComponents: [JazzDialog],
})

export class NewBotModule {
}