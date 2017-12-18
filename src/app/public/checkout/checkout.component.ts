import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
  }
  authenticate(provider){
    console.log("--------------gfgfdgf");
    this.authenticationService.loginWithGoogle();
  }
}
