import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }
  openSnackBar(message: any) {
    console.log('message', message);
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }
}
