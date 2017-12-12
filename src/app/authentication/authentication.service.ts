import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FirebaseListObservable, AngularFireDatabase} from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';
import {NotificationService} from '../toastr/toastr.service';


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
                            photoURL: "data:image/jpeg;base64,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"

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
}