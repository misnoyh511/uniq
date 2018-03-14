import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {NewBotService} from './new-bot.service';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {SnackBarService} from '../snack-bar/snack-bar.service';
import {SidebarService} from '../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-new-bot',
  templateUrl: './new-bot.component.html',
  styleUrls: ['./new-bot.component.css'],
  providers: [NewBotService ],
})
export class NewBotComponent implements OnInit, OnDestroy {
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
  latteralTab = true;
  floatingIcon = false;
  faqSection: boolean;
  faqShowHide = false;
  proActiveShowHide = false;
  liveChat= false;
  showDialog = false;
  bot: any = {};
  proActive: boolean;
  liveChatShowHide = false;
  proHide = true;
  snackBars = false;
  snackbarsOne = false;
  color: string;
  file: any[];
  avatarFile: any[];
  coverFile: any[];
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
  errors: any = [];
  emptyField = false;
  operator = false;

  constructor(private router: Router, private Service: NewBotService, public sbs: SidebarService,
              public dialog: MatDialog, @Inject(DOCUMENT) private doc: any, public snackBarService: SnackBarService) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });
  }

  ngOnInit() {
    this.bot = {
      active: true,
      tab_name: 'Asistencia Municipal',
      box_state: false,
      complements_title: 'Preguntas Frecuentes',
      feedback_type: 0,
      with_login: false,
      hybrid_mode: false,
      dwell_time: null,
      closed_msg: 'admin disconnected',
      mobile_complements: false,
      medium_ids: [],
      hybrid_msg: 'Necesitas asistencia? puedo ayudarte',
      hybrid_mobile: true
    };
    this.bot.tab_color = '#AB2567';
    this.bot.tab_text_color = '#AB2567';
  }

  ngOnDestroy() {
    // this.sbs.savedData = this.bot;
  }

  next() {
    if (this.latteralTab) {
      this.bot.icon_tab = false;
    }
    if (this.floatingIcon) {
      this.bot.icon_tab = true;
    }
    this.bot.icon_color = this.bot.tab_text_color;
  }

  uploadAvatarImage() {
    const formData = new FormData();
    if (this.avatarFile) {
      for (let i = 0; i < this.avatarFile.length; i++) {
        formData.append('file', this.avatarFile[i], this.avatarFile[i].name);
      }
      formData.append('role', 'avatar');

      this.Service.upload(formData).subscribe((response) => {
          this.bot.medium_ids.push(response.media[0].id);
          this.snackBarService.openSnackBar('Avatar Image Uploaded');
        },
        (error) => {
          console.log('error', error);
        });
    }
  }

  uploadCoverImage() {
    const formData = new FormData();
    if (this.coverFile) {
      for (let i = 0; i < this.coverFile.length; i++) {
        formData.append('file', this.coverFile[i], this.coverFile[i].name);
      }
      formData.append('role', 'cover');

      this.Service.upload(formData).subscribe((response) => {
          this.bot.medium_ids.push(response.media[0].id);
          this.snackBarService.openSnackBar('Cover Image Uploaded');
        },
        (error) => {
          console.log('error', error);
        });
    }
  }

  latteralToggle() {
    this.floatingIcon = !this.latteralTab;
  }

  floatingToggle() {
    this.latteralTab = !this.floatingIcon;
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

  checkValidation() {
    this.errors = [];
    this.emptyField = false;
    if (!this.bot.token) {
      this.errors.push({message: 'Token Missing', value: '#capture'});
    }
    if (!this.bot.operator_name || !this.bot.chat_window_name || !this.bot.initial_greeting || !this.bot.input_title || this.bot.waiting_msg) {
      if (!this.bot.operator_name) {
        this.errors.push({
          message: 'Bot Name is Missing', value: '#message'
        });
      }
      if (!this.bot.chat_window_name) {
        this.errors.push({
          message: 'Chat Window Missing of Bot', value: '#message'
        });
      }
      if (!this.bot.initial_greeting) {
        this.errors.push({
          message: 'Welcome Message is Missing', value: '#message'
        });
      }
      if (!this.bot.input_title) {
        this.errors.push({
          message: 'Input Title is Missing', value: '#message'
        });
      }
      if (!this.bot.waiting_msg) {
        this.errors.push({
          message: 'Waiting Message is Missing', value: '#message'
        });
      }
    }

    if (this.errors && this.errors.length) {
      this.emptyField = true;
    }
  }

  redirectPage(value) {
    if (value === '#capture') {
      this.showNlp = true;
      this.showLook = this.showModules = false;
    }
    if (value === '#message') {
      this.showLook = true;
      this.showNlp = this.showModules = false;
    }
    if (value === '#customize') {
      this.showModules = true;
      this.showLook = this.showNlp = false;
    }
  }

  save() {
    this.Service.broadcastToken(this.bot).subscribe((response) => {
      this.bot = response;
      this.sbs.savedData = response;
      this.sbs.deleteMsg = '';
      this.sbs.getBot().subscribe((data) => {
        this.snackBarService.openSnackBar('Bot Created');
        this.router.navigate(['/bot-home']);
      });
    }, (err) => {
      console.log(err);
    });
  }

  clearSearch() {
    this.bot = {};
    this.snackbarsOne = true;
    this.showNlp = true;
    this.showModules = this.showLook = false;
    this.snackBarService.openSnackBar('Your Chat Bot has been reset');
  }

  openModal() {
    this.dialogRef = this.dialog.open(JazzDialog, {position: {top: '15%', left: '23%'}});
    this.dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'Yes!') {
        this.showDialog = false;
        this.snackBars = true;
        this.snackBarService.openSnackBar('Congratulations! You have successfully upgraded to pro mode.');
      }
      this.proHide = false;
    });
  }

  addFaqTopic() {
    if (this.bot.faqTopic) {
      this.Service.addFaq({topics: [{name: this.bot.faqTopic}]}).subscribe((data) => {
        this.topics.push(data.topics[0]);
        this.showTopics = true;
        this.bot.faqTopic = '';
        this.snackBarService.openSnackBar('Faq Topic Created for this Bot');
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
        this.snackBarService.openSnackBar('Faq Question Created for this Topic');
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
          this.snackBarService.openSnackBar('Faq Topic Updated');
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
        this.snackBarService.openSnackBar('Faq Topic Deleted');
        this.getTopicsWithQues();
      }, (err) => {
        console.log(err);
      });
    }
  }

  editQues(quesName, quesId) {
    if (!this.showQues[quesId]) {
      this.Service.editFaqQues({questions: [{name: quesName}]}, quesId).subscribe((data) => {
        this.snackBarService.openSnackBar('Faq Question Updated');
      });
    }
  }

  avatarChangeEvent(fileInput: any) {
    this.avatarFile = fileInput.target.files;
    this.imageUrl = this.avatarFile[0].name;
    this.getAvatarBase64(this.avatarFile[0]);
  }

  getAvatarBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    this.uploadAvatarImage();
  }

  coverChangeEvent(fileInput: any) {
    this.coverFile = fileInput.target.files;
    this.coverUrl = this.coverFile[0].name;
    this.getCoverBase64(this.coverFile[0]);
  }

  getCoverBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.coverPreview = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    this.uploadCoverImage();
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





