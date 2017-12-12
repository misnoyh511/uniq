import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FirebaseListObservable ,AngularFireDatabase} from 'angularfire2/database-deprecated';

@Component({
    selector: 'app-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['../authentication.component.css']
})
export class SignUpComponent {
    user : any = {};
    constructor(private authenticationService : AuthenticationService ,private db: AngularFireDatabase) {
    }
    signUp(){
        this.authenticationService.signup(this.user);
    }
    googleSignIn(){
        this.authenticationService.loginWithGoogle();
    }
}
