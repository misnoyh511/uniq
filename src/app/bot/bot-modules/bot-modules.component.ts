import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar} from '@angular/material';
import {DOCUMENT} from '@angular/platform-browser';
import {BotService} from '../bot.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-bot-modules',
  templateUrl: 'bot-modules.component.html',
  styleUrls: ['./bot-modules.component.css'],
  providers: [BotService]
})
export class botModulesComponent implements OnInit, OnDestroy {
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
  analytics_token: string;
  botData: any = {};
  topics: any = [];
  showTopics = false;
  faqQuestion: any = [];
  quesArr: any = {};
  showQues: any = {};
  showTopic: any = [];
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
  constructor(public dialog: MatDialog, @Inject(DOCUMENT) private doc: any, public snackBar: MatSnackBar,
              public sbs: SidebarService, public botService: BotService) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });
  }

  ngOnInit() {
    if (this.sbs.savedData) {
      this.botData = this.sbs.savedData;
    }
    this.sbs.subject.subscribe((data) => {
      this.botData = data[0];
    });

    this.sbs.broadC.subscribe((data) => {
      this.botData = data;
    });
  }

  ngOnDestroy() {
    this.sbs.savedData = this.botData;
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
      this.botService.addFaq({topics: [{name: this.bot.faqTopic}]}).subscribe((data) => {
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
      this.botService.addFaqQuestion({questions: [{name: this.faqQuestion[index]}], topicId : topicId}).subscribe((data) => {
        this.getTopicsWithQues();
        this.faqQuestion[index] = '';
      }, (err) => {
        console.log(err);
      });
    }
  }

  getTopicsWithQues() {
    this.topics = [];
    this.botService.getTopicsWithQues().subscribe((data) => {
      this.topics = data.topics;
      const questions = {};
      data.questions.forEach( function(item){
        const key = item['id']; // take the first key from every object in the array
        questions[ key ] = item;  // assign the key and value to output obj
      });
      this.quesArr = questions;
    }, (err) => {
      console.log(err);
    });
  }

  editTopic(topic, index) {
    if (!this.showTopic[index]) {
      if (topic.name) {
        this.botService.editFaq({topics: [{name: topic.name}]}, topic.id).subscribe((data) => {
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
      this.botService.deleteFaqTopic(topicId).subscribe((data) => {
        this.getTopicsWithQues();
      }, (err) => {
        console.log(err);
      });
    }
  }

  editQues(quesName, quesId) {
    if (!this.showQues[quesId]) {
      this.botService.editFaqQues({questions: [{name: quesName}]}, quesId).subscribe((data) => {
      });
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

