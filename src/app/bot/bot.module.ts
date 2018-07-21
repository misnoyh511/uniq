import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BotHomeComponent} from './bot-home/bot-home.component';
import {BotConfigurationComponent} from './bot-configuration/bot-configuration.component';
import {BotInstallationComponent} from './bot-installation/bot-installation.component';
import {BotLookFeelComponent} from './bot-look-feel/bot-look-feel.component';
import {BotModulesComponent, JazzDialog} from './bot-modules/bot-modules.component';
import {botRoutes} from './bot.routing';
import {SharedModule} from '../shared/shared.module';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { ClipboardModule } from 'ngx-clipboard';
import { BotPreviewComponent } from './bot-preview/bot-preview.component';
import {DragulaModule} from 'ng2-dragula/ng2-dragula';

@NgModule({
    imports: [
        RouterModule.forChild(botRoutes),
        SharedModule,
        ClipboardModule,
        DragulaModule
    ],
    declarations: [BotHomeComponent, BotConfigurationComponent, BotInstallationComponent, BotLookFeelComponent,
        BotModulesComponent, JazzDialog, BotPreviewComponent, SubNavComponent],
    entryComponents: [JazzDialog]
})

export class BotModule {
}
