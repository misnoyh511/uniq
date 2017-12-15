import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../authentication.component.css']
})
export class LoginComponent {
    user :any = {};
    constructor(private authenticationService : AuthenticationService ) {
        this.authenticationService.checkAuthenticate();
    }
    loginWithGoogle(){
        this.authenticationService.loginWithGoogle();
    }
    login(){
        this.authenticationService.login(this.user.email,this.user.password);
    }

}
