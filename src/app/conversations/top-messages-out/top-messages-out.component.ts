import { Component, OnInit, OnDestroy } from '@angular/core';
import {ConversationsService} from '../conversations.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-top-messages-out',
  templateUrl: './top-messages-out.component.html',
  styleUrls: ['./top-messages-out.component.css'],
    providers: [ConversationsService]
})
export class TopMessagesOutComponent implements OnInit, OnDestroy {

    topMessagesOut: any = [];
    data: any = {};
    showTooltip= false;
    totalCount = 0;
    colorClass = ['green-bar', 'purple-bar', 'blue-bar', 'orange-bar', 'maron-bar'];
    analytics_token: string;

  constructor(private conversationsService: ConversationsService, public sbs: SidebarService) { }

  ngOnInit() {
    if (this.sbs.token) {
      this.analytics_token =  this.sbs.token;
      this.getTopMessageOut();
    }
    this.sbs.botList.subscribe((data) => {
      this.analytics_token = data[0].analytics_token;
      this.getTopMessageOut();
    });

    this.sbs.botData.subscribe((data) => {
      this.analytics_token = data.analytics_token;
      this.getTopMessageOut();
    });
  }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
  }

  getTopMessageOut() {
    this.topMessagesOut = [];
    this.conversationsService.getTopMessagesOut(this.analytics_token).subscribe((response) => {
      this.topMessagesOut = response.data;
      for (const i in this.topMessagesOut) {
        this.totalCount = this.totalCount + parseInt(this.topMessagesOut[i].count);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
