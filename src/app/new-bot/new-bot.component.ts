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
  imageUrl: any;
  coverUrl: any;
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
  coverPreview: any;
  dialogFlow = true;
  comingSoon1 = false;
  comingSoon2 = false;
  showDesktop = false;
  showMobile = false;
  showTopics = false;
  topics: any = [];
  questions: any = [];
  showTopic: any = [];
  quesArr: any = {};
  showQues: any = {};
  faqQuestion: any = [];

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
  }

  next() {
    console.log('reached==========', this.bot);
  }

  uploadImage(role) {
    const formData = new FormData();
    if (this.file) {
      for (let i = 0; i < this.file.length; i++) {
        formData.append('file', this.file[i], this.file[i].name);
      }
      formData.append('role', role);

      this.Service.upload(formData).subscribe((response) => {
          console.log('response', response);
        },
        (error) => {
          console.log('error', error);
        });
    }
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
      this.Service.getBot().subscribe((data) => {
        this.bot = data;
        if (this.bot.length > 0) {
          this.data = this.bot[0].analytics_token;
        }
        this.router.navigate(['/bot-home']);
      });
    }, (err) => {
      console.log(err);
    });
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

  addFaqQuestion(topicId, index) {
    if (this.faqQuestion[index]) {
      this.bot.question = this.faqQuestion[index];
      this.Service.addFaqQuestion({questions: [{name: this.faqQuestion[index]}], topicId: topicId}).subscribe((data) => {
        this.getTopicsWithQues();
        this.faqQuestion[index] = '';
      }, (err) => {
        console.log(err);
      });
    }
  }

  getTopicsWithQues() {
    this.topics = [];
    this.Service.getTopicsWithQues().subscribe((data) => {
      this.topics = data.topics;
      const questions = {};
      data.questions.forEach(function (item) {
        const key = item['id']; // take the first key from every object in the array
        questions[key] = item;  // assign the key and value to output obj
      });
      this.quesArr = questions;
    }, (err) => {
      console.log(err);
    });
  }

  editTopic(topic, index) {
    if (!this.showTopic[index]) {
      if (topic.name) {
        this.Service.editFaq({topics: [{name: topic.name}]}, topic.id).subscribe((data) => {
          this.getTopicsWithQues();
        }, (err) => {
          console.log(err);
        });
      } else {
        console.log('please add faq topic');
      }
    }
  }

  deleteFaqTopic(topicId, topicName) {
    if (confirm('This will delete the topic ' + topicName + '. You sure?')) {
      this.Service.deleteFaqTopic(topicId).subscribe((data) => {
        this.getTopicsWithQues();
      }, (err) => {
        console.log(err);
      });
    }
  }

  editQues(quesName, quesId) {
    if (!this.showQues[quesId]) {
      this.Service.editFaqQues({questions: [{name: quesName}]}, quesId).subscribe((data) => {
      });
    }
  }

  fileChangeEvent(fileInput: any, role) {
    this.file = fileInput.target.files;
    if (role === 'avatar') {
      this.imageUrl = this.file[0].name;
    }
    if (role === 'cover') {
      this.coverUrl = this.file[0].name;
    }
    this.getBase64(this.file[0], role);
  }

  getBase64(file, role) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (role === 'avatar') {
        this.imagePreview = reader.result;
      }
      if (role === 'cover') {
        this.coverPreview = reader.result;
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    this.uploadImage(role);
  }

  deleteImage(role) {
    if (role === 'avatar') {
      this.imageUrl = '';
    }
    if (role === 'cover') {
      this.coverUrl = '';
    }
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




