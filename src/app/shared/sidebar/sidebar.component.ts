import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import {SidebarService} from './sidebar.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Broadcaster} from '../../broadcaster';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService],
})
export class SidebarComponent implements OnInit {
  @Input() navType;
  @Input() getUrl;
  bot: any[];
  name: String;
  data: any;
  id: any;
  linkUrl: any;
  showStarted = false;
  showKnowledge = false;
  showConversation = false;
  showReport = false;
  showAccount = false;
  message: string;
  showList = false;
  currentBot: string;
  botData: any = {};
  showMenu = false;

  constructor(private broadcaster: Broadcaster, private location: Location, private Service: SidebarService) { }

  ngOnInit() {
    this.onloaddata();
    if (!this.data) {
      this.data = 'Bot Providencia';
    }
    if (location.pathname.includes('knowledge-center')) {
      this.showKnowledge = true;
    } else if (location.pathname.includes('conversation')) {
      this.showConversation = true;
    } else if (location.pathname.includes('reports')) {
      this.showReport = true;
    } else if (location.pathname.includes('get-started')) {
      this.showStarted = true;
    } else if (location.pathname.includes('account')) {
      this.showAccount = true;
    }
  }

  onloaddata() {
   this.Service.getBot().subscribe((data) => {
     this.bot = data;
     this.currentBot = this.bot[0].name;
     if (this.bot.length > 0) {
       this.data = this.bot[0];
       // console.log("===================",this.data.token);
     }
   });
  }
  dropDown(getUrl, botData) {
    if (botData) {
      console.log('botData', botData);
      this.currentBot = botData.name;
      localStorage.setItem('ANALYTICS_TOKEN', botData.analytics_token);
      localStorage.setItem('FEEDBACK_TYPE', botData.feedback_type);
      localStorage.setItem('CURRENT_BOT', JSON.stringify(botData));
      AppConfig.FEEDBACK_TYPE['type'] = botData.feedback_type;
      AppConfig.TOKEN['type'] = botData.analytics_token;
      this.showList = false;
    }
    this.broadcaster.broadcast('BotChanged', 'some message');
    if (getUrl.split('/')[2]) {
      this.linkUrl = '/' + this.getUrl ;
    } else {
      delete this.linkUrl;
    }
  }
}
