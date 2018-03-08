import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConversationsService} from '../conversations.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
    selector: 'app-top-messages-in',
    templateUrl: './top-messages-in.component.html',
    styleUrls: ['./top-messages-in.component.css'],
    providers: [ConversationsService]
})
export class TopMessagesInComponent implements OnInit, OnDestroy {
    topMessagesIn: any = [];
    showTooltip = false;
    totalCount = 0;
    colorClass = ['green-bar', 'purple-bar', 'blue-bar', 'orange-bar', 'maron-bar'];
    analytics_token: string;

    constructor(public conversationsService: ConversationsService, public sbs: SidebarService) {

    }

    ngOnInit() {
      if (this.sbs.token) {
        this.analytics_token =  this.sbs.token;
        this.getTopMessageIn();
      }
      this.sbs.subject.subscribe((data) => {
        this.analytics_token = data[0].analytics_token;
        this.getTopMessageIn();
      });

      this.sbs.broadC.subscribe((data) => {
        this.analytics_token = data.analytics_token;
        this.getTopMessageIn();
      });
    }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
  }

    getTopMessageIn() {
      this.topMessagesIn = [];
      this.conversationsService.getTopMessagesIn(this.analytics_token).subscribe((response) => {
        this.topMessagesIn = response.data;

        for (const i in this.topMessagesIn) {
          this.totalCount = this.totalCount + parseInt(this.topMessagesIn[i].count);
        }
      }, (err) => {
        console.log(err);
      });
    }

}
