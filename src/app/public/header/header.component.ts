import { Component, OnInit } from '@angular/core';
import {AppConfig} from '../../app.config';
import {Router} from "@angular/router";
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticate : boolean = false;
  constructor(private authenticationService : AuthenticationService ,private router : Router) { }

  ngOnInit() {
    if(localStorage[AppConfig.USER_INFO_KEY]){
      this.isAuthenticate = true;
    }
  }
  logOut(){
    delete localStorage[AppConfig.USER_INFO_KEY];
    this.isAuthenticate = false;
    this.router.navigate(['/'])
  }
}
