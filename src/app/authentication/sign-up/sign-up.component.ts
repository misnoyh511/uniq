import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['../authentication.component.css']
})
export class SignUpComponent {
    user : any = {};
    constructor(private authenticationService : AuthenticationService) {
        this.authenticationService.checkAuthenticate();
    }
    signUp(){
        this.authenticationService.signup(this.user);
    }
    googleSignIn(){
        this.authenticationService.loginWithGoogle();
    }
}
