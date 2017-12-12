import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';
import {AuthenticationModule} from './authentication/authentication.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {environment} from '../environments/environment';
import {AuthGuard} from './auth-guard/auth-guard.middleware';
import {ToastyModule} from 'ng2-toasty';
import {NotificationService} from './toastr/toastr.service';


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
        DashboardModule
    ],
    providers: [AuthGuard, NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
