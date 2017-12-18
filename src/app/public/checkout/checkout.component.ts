import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ActivatedRoute,Router} from '@angular/router';
import {AppConfig} from '../../app.config';


@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user : any = {};
  constructor(private authenticationService : AuthenticationService ,private route :ActivatedRoute) { }

  ngOnInit() {
    this.user.email = this.route.snapshot.params['email'];
    if(localStorage[AppConfig.USER_INFO_KEY]){
      this.user.email = JSON.parse(localStorage[AppConfig.USER_INFO_KEY]).email;
      this.user['authenticated'] = true;
    }
  }
  authenticate(provider){
    this.authenticationService.loginWithGoogle().then((data)=>{
     this.user['authenticated'] = true;
    });
  }
  loginWithFacebook(){
    this.authenticationService.loginWithFacebook().then((data)=>{
      this.user['authenticated'] = true;
    });
  }
}