import {Component, OnInit, OnDestroy} from '@angular/core';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {BotService} from '../bot.service';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-bot-home',
  templateUrl: './bot-home.component.html',
  styleUrls: ['./bot-home.component.css'],
  providers: [BotService]
})
export class BotHomeComponent implements OnInit, OnDestroy {
  bot: any[];
  data: any;
  botData: any = {};
  analytics_token: string;
  showDiv = false;
  previewDiv = false;
  configureDiv = false;
  lookDiv = false;
  feedbackDiv = false;
  insertDiv = false;
  reportDiv = false;
  installDiv = false;
  previewBot: string;
  showBotConfig = false;
  lookConfig = false;
  previewConfig = false;
  installConfig = false;
  knowledgeConfig = false;
  inviteConfig = false;
  reportConfig = false;
  productConfig = false;
  showDelete = false;
  showEditPass = false;
  constructor(public sbs: SidebarService, public botService: BotService, public snackBarService: SnackBarService) {}

  ngOnInit() {
    if (this.sbs.savedData) {
      this.botData = this.sbs.savedData;
      this.previewBot = AppConfig.PREVIEW_BOT + this.botData.id;
    }
    this.sbs.botList.subscribe((data) => {
        if (localStorage.getItem('CURRENT_BOT')) {
            this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
        } else {
            this.botData = data[0];
        }
        this.previewBot = AppConfig.PREVIEW_BOT + this.botData.id;
    });

    this.sbs.botData.subscribe((data) => {
      this.botData = data;
        this.previewBot = AppConfig.PREVIEW_BOT + this.botData.id;
    });
  }

  ngOnDestroy() {
    this.sbs.savedData = this.botData;
  }
  onFaqOutside(event) {
    if (event) {
      this.showDiv = false;
    }
  }
  onPreviewOutside(event) {
    if (event) {
      this.previewDiv = false;
    }
  }
  onInsertOutside(event) {
    if (event) {
      this.insertDiv = false;
    }
  }
  onLookOutside(event) {
    if (event) {
      this.lookDiv = false;
    }
  }
  onInstallOutside(event) {
    if (event) {
      this.installDiv = false;
    }
  }
  onReportOutside(event) {
  if (event) {
    this.reportDiv = false;
  }
}
  onConfigureOutside(event) {
    if (event) {
      this.configureDiv = false;
    }
  }
  onFeedbackOutside(event) {
    if (event) {
      this.feedbackDiv = false;
    }
  }
  changeBotStatus() {
    const bot = {
      active: this.botData.active
    };
    this.editBot(bot);
  }

  editBotConfig() {
    const bot = {
      token: this.botData.token
    };
    this.editBot(bot);
  }

  editBot(bot) {
    this.botService.editBot(bot, this.botData.id).subscribe((data) => {
      this.botData = data;
      this.snackBarService.openSnackBar('Bot Status Updated');
    }, (err) => {
      console.log(err);
    });
  }
}
