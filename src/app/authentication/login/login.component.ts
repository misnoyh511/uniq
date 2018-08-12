///<reference path="../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';
import {SnackBarService} from '../../snack-bar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['../authentication.component.css']
})
export class LoginComponent {
  user: any = {};
  clientId = AppConfig.CLIENT_ID;


  constructor(private snackBarService: SnackBarService,
              private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.checkAuthenticate();
  }

  login() {
    // this.authenticationService.login(this.user.email,this.user.password);
    this.authenticationService.loginAuth(this.user.email, this.user.password).subscribe((data) => {
      this.router.navigate(['/get-started']);
    }, (err) => {
      console.log(err);
    });
  }

  tryGoogleLogin() {
    this.authenticationService.doGoogleLogin().then((data) => {
      this.router.navigate(['/get-started']);
    });
  }
}

