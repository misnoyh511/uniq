import {Component, OnInit, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck} from '@angular/core';
import {ConversationsService} from '../../conversations/conversations.service';
import {AppConfig} from '../../app.config';


@Component({
    selector: 'app-bot-configuration',
    templateUrl: 'bot-configuration.component.html',
    styleUrls: ['./bot-configuration.component.css'],
    providers: [ConversationsService]
})
export class botConfigurationComponent implements OnInit, DoCheck {

    showNlp = false;
    showConfig = false;
    showDelete = false;
    showEditPass = false;
    dialogFlow = true;
    comingSoon1 = false;
    comingSoon2 = false;
    currentBot: string;
    token: string;
    bot: any = {};
    data: any;
    botData: any = {};
    analytics_token: string;
    tokenDiffer: KeyValueDiffer<string, any>;
    constructor(private differs: KeyValueDiffers, public conversationsService: ConversationsService) { }

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
}
