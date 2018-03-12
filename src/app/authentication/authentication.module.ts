import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthenticationService} from './authentication.service';
import {AuthenticationRoutes} from './authentication.routing';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';
import {ToastyModule} from 'ng2-toasty';


@NgModule({
    imports: [
        RouterModule.forChild(AuthenticationRoutes),
        FormsModule,
        ToastyModule.forRoot(),
        CommonModule
    ],
    declarations: [LoginComponent, SignUpComponent],
    providers:[AuthenticationService, AngularFireDatabase]
})

export class AuthenticationModule {}
