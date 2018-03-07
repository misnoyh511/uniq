import {Component, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, OnInit, DoCheck} from '@angular/core';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {ConversationsService} from '../../conversations/conversations.service';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-bot-home',
  templateUrl: './bot-home.component.html',
  styleUrls: ['./bot-home.component.css'],
  providers: [SidebarService, ConversationsService],
})
export class botHomeComponent implements OnInit, DoCheck {
  bot: any[];
  data: any;
  botData: any = {};
  analytics_token: string;
  tokenDiffer: KeyValueDiffer<string, any>;
  constructor(private differs: KeyValueDiffers, public conversationsService: ConversationsService, public sbs: SidebarService) {


  }

  ngOnInit() {
    this.sbs.subject.subscribe((data) => {
      console.log('data***********************', data);
     // this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
    });

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
