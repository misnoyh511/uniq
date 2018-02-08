import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';

import { HttpModule } from '@angular/http';
import {LocalStorageService} from './local-storage/local-storage.service';
import {InterceptorService} from './interceptor/interceptor.service';
import {AuthenticationModule} from './authentication/authentication.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {environment} from '../environments/environment';
import {AuthGuard} from './auth-guard/auth-guard.middleware';
import {ToastyModule} from 'ng2-toasty';
import {NotificationService} from './toastr/toastr.service';
import {PublicModule} from './public/public.module';
import { GetStarteddModule } from './get-started/get-started.module';
import {SharedModule} from './shared/shared.module';
import {NewBotModule} from "./new-bot/new-bot.module";
import { AutomateModule } from './automate/automate.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ReportsModule } from './reports/reports.module';
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { botModule } from './bot/bot.module';
import {HttpClientModule} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {JazzDialog} from "./new-bot/new-bot.component";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AuthenticationModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    HttpModule,

    DashboardModule,
    PublicModule,
    GetStarteddModule,
    SharedModule,
    NewBotModule,
    AutomateModule,
    ConversationsModule,
    ReportsModule,
    AccountSettingsModule,
    botModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, NotificationService, InterceptorService, LocalStorageService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
