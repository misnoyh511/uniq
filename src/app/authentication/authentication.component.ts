import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';

@Component({
    selector: 'app-authentication',
    templateUrl: 'authentication.component.html'
})
export class AuthenticationComponent implements OnInit{
    authenticate  :any;
    constructor(private authenticationService : AuthenticationService) {
        this.authenticate = authenticationService;
    }
    ngOnInit(){
    }

}
