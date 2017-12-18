import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  constructor(private authenticationService :AuthenticationService ,private router : Router) { }

  ngOnInit() {
  }
  signOut(){
    this.authenticationService.logout().then((data)=>{
      this.router.navigate(['/'])
    });
  }

}
