import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {NewBotService} from './new-bot.service';
import {NotificationService} from '../toastr/toastr.service';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar} from '@angular/material';

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

  name: String;
  chat_window_name: String;
  input_title: String;
  waiting_msg: String;
  initial_greeting: String;
  latteralTab: boolean;
  floatingIcon: boolean;
  faqSection: boolean;
  faqShowHide: boolean;
  proActiveShowHide: boolean;
  liveChat: boolean;
  showDialog = false;
  bot: any = {};
  proActive: boolean;
  liveChatShowHide: boolean;
  proHide = true;
  snackBars = false;
  snackbarsOne = false;
  color: string;
  file: any[];
  files: any = [];
  imageUrl: any;
  selectedFileObj: any = [];
  selectedFiles: any = [];
  photos: any = [];
  myInputVariable: any;
  data: any;
  showDiv = false;
  showNlp = true;
  showLook = false;
  showModules = false;
  showTooltip = false;
  showBotName = false;
  showChatName = false;
  showWelcome = false;
  showTitle = false;
  showWaiting = false;
  showAvatar = false;
  showCover = false;
  showBackClr = false;
  showFontClr = false;
  showProject = false;
  showFeature = false;
  showBusiness = false;
  progress: number;
  showLiveChat = false;
  showOpenChat = false;
  showChatWindow = false;
  imagePreview: any;
  dialogFlow = true;
  comingSoon1 = false;
  comingSoon2 = false;
  showDesktop = false;
  showMobile = false;
  showTopics = false;
  topics: any = [];
  questions: any = [];
  showTopic = false;
  topicName: string;
  topic : any = {};


  constructor(private router: Router, private Service: NewBotService, private toasterService: NotificationService,
              public dialog: MatDialog, @Inject(DOCUMENT) private doc: any, public snackBar: MatSnackBar) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });
  }

  ngOnInit() {
    this.bot.color = '#AB2567';
    this.bot.fcolor = '#AB2567';
    this.bot.latteralTab = true;
    this.faqShowHide = false;
    this.proActiveShowHide = false;
    this.liveChatShowHide = false;
    this.liveChat = false;
    this.getTopicsWithQues();
  }

  next() {
    console.log('reached==========', this.bot);
  }

  /*fileChangeEvent(fileInput: any) {
    this.file = fileInput.target.files;
    this.imageUrl = this.file[0].name;
    this.uploadFile();
  }*/

  uploadFile() {
    if (this.file) {
      for (let i = 0; i < this.file.length; i++) {
        const file = this.file[i];
        this.selectedFileObj.push(this.file[i]);
        if (!file.$error) {
          this.uploadImage(file);
        }

      }
      this.imageUrl = '';
    }
  }

  uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('role', 'avatar');

    // manually start uploading
    this.Service.upload(formData).subscribe((response) => {
        const responseData: any = response;
        this.selectedFiles.push(responseData.file._id);
        if (this.photos) {
          this.photos.push(responseData.file);
        }
        this.myInputVariable.nativeElement.value = '';
      },
      (error) => {
        // this.toasterService.pop('error', 'File Upload failed', error.message);
      });

  }

  latteralToggle() {
    this.bot.floatingIcon = !this.bot.latteralTab;
  }

  floatingToggle() {
    this.bot.latteralTab = !this.bot.floatingIcon;
  }

  faqSectionToggle() {
    if (this.bot.faqSection) {
      this.faqShowHide = true;
    } else {
      this.faqShowHide = false;
    }
  }
  proActiveToggle() {
    if (this.bot.proActive) {
      this.proActiveShowHide = true;
    } else {
      this.proActiveShowHide = false;
    }
  }
  liveChatToggle() {
    if (this.bot.liveChat) {
      this.liveChatShowHide = true;
    } else {
      this.liveChatShowHide = false;
    }
  }
  save() {
    this.Service.broadcastToken(this.bot).subscribe((x) => {
      console.log(x);
      this.Service.getBot().subscribe((data) => {
        this.bot = data;
        if (this.bot.length > 0) {
          this.data = this.bot[0].analytics_token;
        }
      });
      // this.toasterService.pop('success', 'new bot created successful', '');
    }, (err) => {
      console.log(err);
    });
    /* this.Service[.broadcastToken(this.bot);*/
    /*} else {
     console.log("erroe ==============");
     }*/
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
  addFaqTopic() {
    if (this.bot.faqTopic) {
      this.bot.name = this.bot.faqTopic;
      this.Service.addFaq({topics: [{name: this.bot.name}]}).subscribe((data) => {
        this.topics.push(data.topics[0]);
        this.showTopics = true;
        this.bot.faqTopic = '';
      }, (err) => {
        console.log(err);
      });
    } else {
        console.log('please add faq topic');
      }
    }

    addFaqQuestion(topicId) {
      if (this.bot.faqQuestion) {
        this.bot.question = this.bot.faqQuestion;
        this.Service.addFaqQuestion({questions: [{name: this.bot.question}], topicId : topicId}).subscribe((data) => {
          this.questions.push(data.questions[0]);
          this.bot.faqQuestion = '';
        }, (err) => {
          console.log(err);
        });
      }
    }

  getTopicsWithQues() {
    this.Service.getTopicsWithQues().subscribe((data) => {
    }, (err) => {
      console.log(err);
    });
  }

  editTopic(topic) {
    if (!this.showTopic) {
      if (this.topic.name) {
        this.bot.name = this.topic.name;
        this.Service.editFaq({topics: [{name: this.bot.name}]}, topic.id).subscribe((data) => {
          this.topic = data.topics[0];
          this.showTopics = true;
          this.bot.faqTopic = '';
        }, (err) => {
          console.log(err);
        });
      } else {
        console.log('please add faq topic');
      }
    }
  }

  fileChangeEvent(fileInput: any) {
    this.file = fileInput.target.files;
    for (const i in fileInput.target.files) {
      this.files.push(this.file[i].name);
    }
    // this.imageUrl = this.file[0].name;
    this.getBase64(this.file);
  }
  getBase64(files) {
    const reader = new FileReader();
    for (const i in files) {
      reader.readAsDataURL(files[i]);
      reader.onload = () => {

        this.imagePreview = reader.result;
      };
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
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




