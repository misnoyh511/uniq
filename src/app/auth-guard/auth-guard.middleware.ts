import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

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
        return this.afAuth.authState
            .take(1)
            .map(authState => !!authState)
            .do(authenticated => {
                !authenticated ? this.router.navigate(['/']) : true
            });
    }
}
