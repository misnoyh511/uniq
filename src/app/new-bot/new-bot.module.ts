
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NewBotComponent, JazzDialogComponent} from './new-bot.component';
import { NewBotRoutes} from './new-bot.routing';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {DragulaModule} from 'ng2-dragula/ng2-dragula';

@NgModule({
    imports: [
        RouterModule.forChild(NewBotRoutes),
        SharedModule,
        CommonModule,
        FormsModule,
        MatTooltipModule,
        DragulaModule
    ],
    declarations: [NewBotComponent, JazzDialogComponent],
    entryComponents: [JazzDialogComponent],
})

export class NewBotModule {
}
