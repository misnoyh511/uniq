import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { botHomeComponent } from './bot-home/bot-home.component';
import { botConfigurationComponent } from './bot-configuration/bot-configuration.component';
import { botInstallationComponent } from './bot-installation/bot-installation.component';
import { botLookFeelComponent } from './bot-look-feel/bot-look-feel.component';
import { botModulesComponent, JazzDialog } from './bot-modules/bot-modules.component';
import {botRoutes} from './bot.routing';
import {SharedModule} from '../shared/shared.module';
import { SubNavComponent } from './sub-nav/sub-nav.component';


@NgModule({
  imports: [
    RouterModule.forChild(botRoutes),
    SharedModule
  ],
  declarations: [botHomeComponent, botConfigurationComponent, botInstallationComponent, botLookFeelComponent,
    botModulesComponent, SubNavComponent, JazzDialog],
  entryComponents: [JazzDialog]
})

export class botModule {
}
