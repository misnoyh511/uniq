import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AccountSettingsComponent} from './account-settings.component';
import {AccountSettingsRoutes} from './account-settings.routing';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    RouterModule.forChild(AccountSettingsRoutes),
    SharedModule
  ],
  declarations: [AccountSettingsComponent]
})

export class AccountSettingsModule {
}
