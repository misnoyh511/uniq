import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {NewBotService} from "./new-bot.service";
import {NotificationService} from '../toastr/toastr.service'
import {DOCUMENT} from "@angular/platform-browser";
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar} from "@angular/material";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-bot',
  templateUrl: './new-bot.component.html',
  styleUrls: ['./new-bot.component.css'],
  providers: [NewBotService ],
})
export class NewBotComponent implements OnInit {
  _color: string = null;
  isRequired = false;
  isDisabled = false;
  container: string = 'inline';
  containers: Array<any> = [
    { text: 'Inline', value: 'inline' },
    { text: 'Dialog', value: 'dialog' }];
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

  token: String;
  name: String;
  chatWindowName: String;
  inputTitle: String;
  waitingMsg: String;
  initialGreeting: String;
  latteralTab: boolean;
  floatingIcon: boolean;
  faqSection: boolean;
  faqShowHide: boolean;
  proActiveShowHide: boolean;
  beginConversation : boolean;
  liveChat : boolean;
  showDialog : boolean = false;
  proActive : boolean;
  chatBotWindow : boolean;
  liveChatShowHide : boolean;
  chatWindow : boolean;
  proHide : boolean = true;
  snackBars: boolean = false;
  snackbarsOne: boolean = false;
  bot: any = {};

  constructor(private router: Router, private Service: NewBotService, private toasterService: NotificationService, public dialog: MatDialog, @Inject(DOCUMENT) private doc: any,
              public snackBar: MatSnackBar) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });
  }

  ngOnInit() {
    this.bot.latteralTab = true;
    this.faqShowHide = false;
    this.proActiveShowHide = false;
    this.liveChatShowHide = false;
    this.liveChat = false;
  }

  next() {
    console.log("reached==========",this.bot);
  }

  latteralToggle() {
    this.bot.floatingIcon = !this.bot.latteralTab;
  }

  floatingToggle() {
    this.bot.latteralTab = !this.bot.floatingIcon;
  }

  faqSectionToggle() {
    if(this.bot.faqSection) {
      this.faqShowHide = true;
    }
    else
      this.faqShowHide = false;
  }
  proActiveToggle(){
    if(this.bot.proActive) {
      this.proActiveShowHide = true;
    }
    else
      this.proActiveShowHide = false;
  }
  liveChatToggle(){
    if(this.bot.liveChat) {
      this.liveChatShowHide = true;
    }
    else
      this.liveChatShowHide = false;
  }
  save(){
      this.Service.broadcastToken(this.bot).subscribe((x) => {
        console.log(x);
        // this.toasterService.pop('success', 'new bot created successful', '');
      });
      /* this.Service[.broadcastToken(this.bot);*/
    /*} else {
      console.log("erroe ==============");
    }*/
  }

  clearSearch(){
    this.bot = {};
    this.snackbarsOne = true;
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 3000,
    });
  }
  openModal() {
    this.dialogRef = this.dialog.open(JazzDialog, {position: {top: '15%', left: '23%'}});
    this.dialogRef.afterClosed().subscribe((result: string) => {
      if(result === 'Yes!') {
        this.showDialog= false;
        this.snackBars = true;
        this.snackBar.openFromComponent(PizzaPartyComponent, {
          duration: 3000,
        });
      }
      this.proHide= false;
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




