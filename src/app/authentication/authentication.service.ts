import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FirebaseListObservable, AngularFireDatabase} from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';
import {SnackBarService} from '../snack-bar/snack-bar.service';
import {AppConfig} from '../app.config';
import {InterceptorService} from '../interceptor/interceptor.service';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {NgProgress} from 'ngx-progressbar';

@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  users: FirebaseListObservable<any[]>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase,
              private snackBarService: SnackBarService, private httpClient: InterceptorService, public ngProgress: NgProgress,
              private http: Http) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
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
        this.firebaseAuth.auth.onAuthStateChanged((response) => {
          if (response) {
            response.updateProfile({ // <-- Update Method here
              displayName: user.name,
              photoURL: null

            }).then((data) => {
              this.writeUserData(value.uid, user);
            });
          }

        });

      })
      .catch(err => {
        this.snackBarService.openSnackBar(err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['/get-started']);

      })
      .catch(err => {
        this.snackBarService.openSnackBar(err.message);
      });
  }

  loginAuth(email: string, password: string) {
    return this.httpClient.get(AppConfig.API_ENDPOINT + '/login?email=' + email + '&password=' + password)
      .map(response => {
        const resJson = response.json();
        const users = resJson.users;
        if (users && users.length > 0) {
          this.snackBarService.openSnackBar('Login Successful');
          localStorage.setItem('USER_INFO_KEY', JSON.stringify(users[0]));
          this.router.navigate(['/get-started']);
          return users[0];
        }
      })
      .catch((err: Response) => {
        if (email === '' && password === '') {
          this.snackBarService.openSnackBar('Please Enter Email and password');
        } else if (email === '') {
          this.snackBarService.openSnackBar('Please Enter Email Address');
        } else if (password === '') {
          this.snackBarService.openSnackBar('Please Enter Password');
        } else {
          this.snackBarService.openSnackBar('Incorrect Email or Password');
        }
        this.ngProgress.done();
        return Observable.of(err);
      });
  }


  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.firebaseAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          console.log(res);
          this.afterLoginWithGoogle(res).subscribe(function (siteUser) {
            console.log(siteUser);
            resolve(siteUser);
          });
          // this.firebaseAuth.auth
          //   .signInWithCredential(res.credential).then(data => {
          //
          // });
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  logout() {
    return this.firebaseAuth
      .auth
      .signOut();
  }

  afterLoginWithGoogle(userData) {
    const myHeaders = new Headers();
    // this.httpClient.createAuthorizationHeader(myHeaders);
    myHeaders.append('Accept', 'application/vnd.hopin-v1+json');
    myHeaders.append('X-HopIn-Application-Id', '2XOZj58Iy6FE3wkSZDHqVlQ9TD1vm43l');
    myHeaders.append('X-HopIn-API-Key', 'Vcq9C97Gm4QE72D2HgUjtbJqjLtTkeJaCGfhGefW3XcwAT' +
      '82xfeYrP5uhHkMyh43PWkWGGJExyetJEp43aBqBYamfENf8nskF5Vg');
    const options = new RequestOptions({headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/users/oauth', {
      'token': userData.credential.idToken,
      'given_name': userData.user.displayName
    }, options)
      .map(response => {
        const resJson = response.json();
        const users = resJson.users;
        if (users && users.length > 0) {
          this.snackBarService.openSnackBar('Login Successful');
          localStorage.setItem('USER_INFO_KEY', JSON.stringify(users[0]));
          this.router.navigate(['/get-started']);
          return users[0];
        }
      })
      .catch((err: Response) => {
        this.ngProgress.done();
        return Observable.of(err);
      });
  }

  loginWithFacebook() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    ).then((result) => {
    }).catch((error) => {
      this.snackBarService.openSnackBar(error.message);
    });
  }

  writeUserData(userId, user) {
    firebase.database().ref('users/' + userId).set({
      displayName: user.name,
      email: user.email
    });
    this.router.navigate(['/home']);
  }

  checkAuthenticate() {
    if ((this.router.url === '/login' || this.router.url === '/sign-up') && localStorage[AppConfig.USER_INFO_KEY]) {
      this.router.navigate(['/home']);
    }
  }

  signupAuth(user) {
    let userInfo = [];
    userInfo = [{
      credentials: {
        default: {
          username: user.name,
          email: user.email,
          password: user.password,
          type: 'sdk'
        }
      }
    }];

    let userData = {};
    userData = {
      users: userInfo
    };

    const myHeaders = new Headers();
    // this.httpClient.createAuthorizationHeader(myHeaders);
    myHeaders.append('Accept', 'application/vnd.hopin-v1+json');
    myHeaders.append('X-HopIn-Application-Id', '2XOZj58Iy6FE3wkSZDHqVlQ9TD1vm43l');
    myHeaders.append('X-HopIn-API-Key', 'Vcq9C97Gm4QE72D2HgUjtbJqjLtTkeJaCGfhGefW3XcwAT82xfeYrP5u' +
      'hHkMyh43PWkWGGJExyetJEp43aBqBYamfENf8nskF5Vg');
    myHeaders.append('Content-Type', 'text/plain; charset=utf-8s');
    const options = new RequestOptions({headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/users', userData, options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        this.ngProgress.done();
        return Observable.of(err.json());
      });
  }
}
