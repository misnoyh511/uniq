import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import {SidebarService} from './sidebar.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Broadcaster} from '../../broadcaster';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService ],
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
     if (this.bot.length > 0) {
       this.data = this.bot[0];
     }
   });
  }
  dropDown(getUrl) {
    if (this.data) {
      localStorage.setItem('ANALYTICS_TOKEN', this.data.analytics_token);
      localStorage.setItem('FEEDBACK_TYPE', this.data.feedback_type);
    }
    this.broadcaster.broadcast('BotChanged', 'some message');
    if (getUrl.split('/')[2]) {
      this.linkUrl = '/' + this.getUrl ;
    } else {
      delete this.linkUrl;
    }
  }
}
