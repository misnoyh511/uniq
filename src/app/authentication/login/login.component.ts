import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../authentication.component.css']
})
export class LoginComponent {
    user: any = {};
    constructor(private authenticationService: AuthenticationService, private router: Router ) {
        this.authenticationService.checkAuthenticate();
    }
    loginWithGoogle() {
        this.authenticationService.loginWithGoogle().then((data) => {
            this.router.navigate(['/get-started']);
        });
    }
    login() {
      // this.authenticationService.login(this.user.email,this.user.password);
        this.authenticationService.loginAuth(this.user.email, this.user.password).subscribe((data) => {
            this.router.navigate(['/get-started']);
        }, (err) => {
          console.log('err', err);
            console.log(err);
        });
    }
    }

