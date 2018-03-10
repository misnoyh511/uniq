import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import {SidebarService} from './sidebar.service';
import {Broadcaster} from '../../broadcaster';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [],
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
    this.Service.subject.subscribe((data) => {
      this.bot = data;
      this.currentBot = this.Service.savedData.name;
    });
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
     }
   });
  }
  dropDown(getUrl, botData) {
    if (botData) {
      this.Service.somethingHappend( botData);
      this.currentBot = botData.name;
      this.showList = false;
    }
    if (getUrl.split('/')[2]) {
      this.linkUrl = '/' + this.getUrl ;
    } else {
      delete this.linkUrl;
    }
  }

  getBotData() {
    for (const i in this.bot) {
      if (this.bot[i].name === this.currentBot) {
        this.Service.savedData = this.bot[i];
        break;
      }
    }
  }
}
