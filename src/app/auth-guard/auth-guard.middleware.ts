import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import {AppConfig} from "../app.config";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private afAuth : AngularFireAuth) {
    }

    /**
     * Method to check weather the user is logged in or not by checking the local storage currentUser key
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {boolean}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(localStorage[AppConfig.USER_INFO_KEY]){
            let user = JSON.parse(localStorage[AppConfig.USER_INFO_KEY]);
            return (user.session_token)? true : false;
        }
        return false;
    }
}
