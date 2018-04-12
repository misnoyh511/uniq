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
export class botHomeComponent implements OnInit, OnDestroy {
  bot: any[];
  data: any;
  botData: any = {};
  analytics_token: string;
  previewBot: string;
  constructor(public sbs: SidebarService, public botService: BotService, public snackBarService: SnackBarService) {}

  ngOnInit() {
    if (this.sbs.savedData) {
      this.botData = this.sbs.savedData;
      this.previewBot = AppConfig.PREVIEW_BOT + this.botData.id;
    }
    this.sbs.botList.subscribe((data) => {
      this.botData = data[0];
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

  changeBotStatus() {
    const bot = {
      active: this.botData.active
    };
    this.botService.editBot(bot, this.botData.id).subscribe((data) => {
      this.botData = data;
      this.snackBarService.openSnackBar('Bot Status Updated');
    }, (err) => {
      console.log(err);
    });
  }
}
