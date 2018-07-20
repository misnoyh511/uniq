import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';
/*import {GoogleSignInSuccess} from 'angular-google-signin';*/

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../authentication.component.css']
})
export class LoginComponent {
    user: any = {};
    clientId = AppConfig.CLIENT_ID;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.authenticationService.checkAuthenticate();
    }

    /*onGoogleSignInSuccess(event: GoogleSignInSuccess) {
        const googleUser: gapi.auth2.GoogleUser = event.googleUser;
        const id: string = googleUser.getId();
        const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        this.authenticationService.loginWithGoogle({'token': profile.getId()}).subscribe((data) => {
            console.log('data', data);
        });
    }*/

    /*loginWithGoogle() {
        this.authenticationService.loginWithGoogle().then((data) => {
            this.router.navigate(['/get-started']);
        });
    }*/

    login() {
        // this.authenticationService.login(this.user.email,this.user.password);
        this.authenticationService.loginAuth(this.user.email, this.user.password).subscribe((data) => {
            this.router.navigate(['/get-started']);
        }, (err) => {
            console.log(err);
        });
    }
}

