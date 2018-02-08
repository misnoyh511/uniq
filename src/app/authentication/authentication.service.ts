import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FirebaseListObservable, AngularFireDatabase} from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';
import {NotificationService} from '../toastr/toastr.service';
import {AppConfig} from '../app.config';
import {InterceptorService} from "../interceptor/interceptor.service";
import {Response} from "@angular/http";

@Injectable()
export class AuthenticationService {
    user: Observable<firebase.User>;
    private userDetails: firebase.User = null;
    users: FirebaseListObservable<any[]>;

    constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase, private notificationService: NotificationService,private httpClient: InterceptorService)  {
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
                this.router.navigate(['/home']);

            })
            .catch(err => {
                this.notificationService.showToastr(err.message);
            });
    }
    loginAuth(user){
        return this.httpClient.get(AppConfig.API_ENDPOINT + '/login?email=testerg%40hop.in&password=hopin123')
       .map(response => {
           response['_body']=JSON.parse(response['_body']);
           if(response['_body'] && response['_body']['users'] && response['_body']['users'][0] && response['_body']['users'][0]['session_token']){
               localStorage.setItem('token', response['_body']['users'][0]['session_token']);
               return response.json();
           }
        })
            .catch((err: Response) => {
                return Observable.of(err);
            });
    }
    logout() {
        return this.firebaseAuth
            .auth
            .signOut();
    }

    loginWithGoogle() {
        return this.firebaseAuth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        ).then((result) => {
        }).catch((error)=> {
            this.notificationService.showToastr(error.message);
        });
    }
    loginWithFacebook() {
        return this.firebaseAuth.auth.signInWithPopup(
            new firebase.auth.FacebookAuthProvider()
        ).then((result) => {
        }).catch((error)=> {
            this.notificationService.showToastr(error.message);
        });
    }
    writeUserData(userId, user) {
        firebase.database().ref('users/' + userId).set({
            displayName: user.name,
            email:user.email
        });
        this.router.navigate(['/home']);
    }
    checkAuthenticate(){
        if((this.router.url == '/login' || this.router.url == '/sign-up') && localStorage[AppConfig.USER_INFO_KEY]){
            this.router.navigate(['/home']);
        }
    }
}
