import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from "@angular/router";
import {AppConfig} from '../app.config';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user : any;
  constructor(private authenticationService :AuthenticationService ,private router : Router) { }

  ngOnInit() {
    if(localStorage[AppConfig.USER_INFO_KEY]){
      this.user = JSON.parse(localStorage[AppConfig.USER_INFO_KEY]);
    }
  }
  logOut(){
    this.authenticationService.logout().then((data)=>{
      this.authenticationService.setComponentType('login');
      this.router.navigate(['/'])
    });

  }

}
