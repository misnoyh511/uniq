import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['../authentication.component.css'],
})
export class SignUpComponent {
    user: any = {};
    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.authenticationService.checkAuthenticate();
    }
    signUp() {
        this.user.type = 'sdk';
        this.authenticationService.signupAuth(this.user).subscribe((data) => {
            this.router.navigate(['/']);
        });
    }
    googleSignIn() {
        this.authenticationService.loginWithGoogle().then((data) => {
            this.router.navigate(['/get-started']);
        });
    }
}
