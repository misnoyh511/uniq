import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {MatStepper} from '@angular/material';

@Component({
    selector: 'app-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['../authentication.component.css'],
})
export class SignUpComponent implements OnInit {
    user: any = {};
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    showTrafficLimit = false;
    showCardFront = true;
    constructor(private authenticationService: AuthenticationService, private router: Router,
                private snackBarService: SnackBarService, private _formBuilder: FormBuilder) {
        this.authenticationService.checkAuthenticate();
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });
    }

    signUp(stepper: MatStepper) {
        this.user.type = 'sdk';
        this.authenticationService.signupAuth(this.user).subscribe((data) => {
            if (data && data.users && data.users.length) {
                this.snackBarService.openSnackBar('Sign up Successful');
                stepper.next();
            } else {
                if (!this.user.name && !this.user.email && !this.user.password) {
                    this.snackBarService.openSnackBar('Please Enter Email and password');
                } else if (!this.user.name) {
                    this.snackBarService.openSnackBar('Please Enter User Name');
                } else if (!this.user.email) {
                    this.snackBarService.openSnackBar('Please Enter Email Address');
                } else if (!this.user.password) {
                    this.snackBarService.openSnackBar('Please Enter Password');
                } else {
                    this.snackBarService.openSnackBar('Something Went Wrong');
                }
            }
        });
    }
    googleSignIn() {
        this.authenticationService.loginWithGoogle().then((data) => {
            this.router.navigate(['/get-started']);
        });
    }
}
