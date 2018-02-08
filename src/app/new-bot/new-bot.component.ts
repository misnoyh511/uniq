import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {NewBotService} from "./new-bot.service";
import {NotificationService} from '../toastr/toastr.service'
import {DOCUMENT} from "@angular/platform-browser";
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from "@angular/material";

@Component({
  selector: 'app-new-bot',
  templateUrl: './new-bot.component.html',
  styleUrls: ['./new-bot.component.css'],
  providers: [NewBotService ],
})
export class NewBotComponent implements OnInit {
  dialogRef: MatDialogRef<JazzDialog>;

  config: MatDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    backdropClass: '',
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      message: 'Jazzy jazz jazz'
    }
  };


  token : String;
  name : String;
  chat_window_name : String;
  input_title : String;
  waiting_msg : String;
  initial_greeting : String;
  launchLink : boolean = false;
  bot: any = {};
  constructor(private router : Router, private Service: NewBotService, private toasterService: NotificationService,public dialog: MatDialog, @Inject(DOCUMENT) private doc: any) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });

  }

  ngOnInit() {
/*
    this.Service.broadcastToken.subscribe((x)=>{
      console.log(x)
      this.toasterService.pop('success', 'new bot created successful', '');
    }, (err) => {
      this.toasterService.pop('failure', 'Error Message', 'null');
      console.log(err);
    });*/

  }
  next(){
    console.log(this.bot);
  }
  save(){
   /* if (localStorage['token']) {*/
      this.Service.broadcastToken(this.bot).subscribe((x) => {
        console.log(x);
        // this.toasterService.pop('success', 'new bot created successful', '');
      });
      /* this.Service[.broadcastToken(this.bot);*/
    /*} else {
      console.log("erroe ==============");
    }*/
  }
  pro(){}

  clearSearch(){
    this.bot = {};
  }
  openModal() {
    this.dialogRef = this.dialog.open(JazzDialog, {position: {top: '15%', left: '23%'}});

    this.dialogRef.afterClosed().subscribe((result: string) => {
      this.dialogRef = null;
      /*this.router.navigate(['../']);*/
      this.doc.body.classList.remove('no-scroll');
    });
  }
}
@Component({
  selector: 'demo-jazz-dialog',
  template: `
   <!-- <h2>Bar dialog</h2>

    <mat-input-container>
      <input matInput placeholder="How much?" #howMuch>
    </mat-input-container>

    <p> {{ data.message }} </p>
    <button mat-button color="primary" (click)="dialogRef.close(howMuch.value)">
      Close dialog
    </button>-->
   
    <div class="unlock-btn-wrap">
        <h3>Upgrade your account to the BUSINESS plan?</h3>
        <p>Your account will be prorated for the amount you have already paid during the current billing period.</p>
        <a class="blue-bg-link unlock-pro-btn" href="#">Yes, Upgrade Me!</a>
        <a class="hide-unlock-wrapper"  data-toggle="pill" (click)="dialogRef.close()" href="#timing">Cancel</a>
    </div>
          
    `
})
export class JazzDialog {

  constructor(public dialogRef: MatDialogRef<JazzDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}




