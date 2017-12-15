import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FirebaseListObservable, AngularFireDatabase} from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';
import {NotificationService} from '../toastr/toastr.service';
import {AppConfig} from '../app.config';


@Injectable()
export class AuthenticationService {
    user: Observable<firebase.User>;
    private userDetails: firebase.User = null;
    users: FirebaseListObservable<any[]>;

    constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase, private notificationService: NotificationService) {
        this.user = firebaseAuth.authState;
        this.user.subscribe(
            (user) => {
                if (user) {
                    this.userDetails = user;
                }
                else {
                    this.userDetails = null;
                }
            }
        );
    }

    signup(user) {
        this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(value => {
                this.firebaseAuth.auth.onAuthStateChanged((response)=> {
                    if(response){
                        response.updateProfile({ // <-- Update Method here
                            displayName: user.name,
                            photoURL: null

                        }).then((data)=> {
                            this.writeUserData(value.uid, user);
                        })
                    }

                });

            })
            .catch(err => {
                this.notificationService.showToastr(err.message);
            });
    }

    login(email: string, password: string) {
        this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                this.router.navigate(['/dashboard']);
            })
            .catch(err => {
                this.notificationService.showToastr(err.message);
            });
    }

    logout() {
        return this.firebaseAuth
            .auth
            .signOut();
    }

    loginWithGoogle() {
        this.firebaseAuth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        ).then((result) => {
            this.router.navigate(['/dashboard']);
        }).catch((error)=> {
            this.notificationService.showToastr(error.message);
        });
    }
    writeUserData(userId, user) {
        firebase.database().ref('users/' + userId).set({
            displayName: user.name,
            email:user.email
        });
        this.router.navigate(['/dashboard']);
    }
    checkAuthenticate(){
        if((this.router.url == '/login' || this.router.url == '/sign-up') && localStorage[AppConfig.USER_INFO_KEY]){
            this.router.navigate(['/dashboard']);
        }
    }
}