import { Component, OnInit, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck } from '@angular/core';
import {AppConfig} from '../../app.config';
import {ConversationsService} from '../../conversations/conversations.service';
import {BotService} from '../bot.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bot-look-feel',
  templateUrl: 'bot-look-feel.component.html',
  styleUrls: ['./bot-look-feel.component.css'],
  providers: [ConversationsService]
})
export class botLookFeelComponent implements OnInit, DoCheck {
  latteralTab = true;
  showBotName = false;
  showChatName = false;
  showWelcome = false;
  showTitle = false;
  showWaiting = false;
  showAvatar = false;
  showCover = false;
  showBackClr = false;
  showFontClr = false;
  botData: any = {};
  analytics_token: string;
  tokenDiffer: KeyValueDiffer<string, any>;
  constructor(private router: Router, private differs: KeyValueDiffers, public conversationsService: ConversationsService, private botService: BotService ) { }

  ngOnInit() {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.tokenDiffer = this.differs.find(AppConfig.TOKEN).create();
    this.conversationsService.registerStringBroadcast();
    this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
  }

  tokenChanged(changes: KeyValueChanges<string, any>) {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
  }

  ngDoCheck(): void {
    const changes = this.tokenDiffer.diff(AppConfig.TOKEN);
    if (changes) {
      this.tokenChanged(changes);
    }
  }

  editBot() {
    this.botService.editBot(this.botData).subscribe((data) => {
      console.log('data', data);
      this.router.navigate(['/bot-home']);
    }, (err) => {
      console.log(err);
    });
  }

}
