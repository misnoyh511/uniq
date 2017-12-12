import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../authentication.component.css']
})
export class LoginComponent {
    user :any = {};
    constructor(private authenticationService : AuthenticationService ,private router : Router) {
        if(this.router.url == '/' && localStorage[AppConfig.USER_INFO_KEY]){
            this.router.navigate(['/dashboard']);
        }
    }
    loginWithGoogle(){
        this.authenticationService.loginWithGoogle();
    }
    login(){
        this.authenticationService.login(this.user.email,this.user.password);
    }

}
