import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar} from '@angular/material';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'app-bot-modules',
  templateUrl: 'bot-modules.component.html',
  styleUrls: ['./bot-modules.component.css']
})
export class botModulesComponent implements OnInit {
  faqSection = false;
  showDiv = false;
  proHide = true;
  showDialog = false;
  showFeature = false;
  snackBars = false;
  snackbarsOne = false;
  proActive = false;
  showBusiness = false;
  progress: number;
  showDesktop = false;
  showMobile = false;
  showLiveChat = false;
  liveChat = false;
  showOpenChat = false;
  showChatWindow = false;
  bot: any = {};
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
  constructor(public dialog: MatDialog, @Inject(DOCUMENT) private doc: any, public snackBar: MatSnackBar) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });
  }

  ngOnInit() {
  }

  clearSearch() {
    this.bot = {};
    this.snackbarsOne = true;
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 3000,
    });
  }

  openModal() {
    this.dialogRef = this.dialog.open(JazzDialog, {position: {top: '15%', left: '23%'}});
    this.dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'Yes!') {
        this.showDialog = false;
        this.snackBars = true;
        this.snackBar.openFromComponent(PizzaPartyComponent, {
          duration: 3000,
        });
      }
      this.proHide = false;
    });
  }

}

@Component({
  selector: 'demo-jazz-dialog',
  template: `
    <div class="unlock-btn-wrap">
        <h3>Upgrade your account to the BUSINESS plan?</h3>
        <p>Your account will be prorated for the amount you have already paid during the current billing period.</p>
        <a class="blue-bg-link unlock-pro-btn" (click)="dialogRef.close('Yes!')">Yes, Upgrade Me!</a>
        <a class="hide-unlock-wrapper"  data-toggle="pill" (click)="dialogRef.close('No!')">Cancel</a>
    </div>
    `
})
export class JazzDialog {
  constructor(public dialogRef: MatDialogRef<JazzDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html'
})
export class PizzaPartyComponent {}

