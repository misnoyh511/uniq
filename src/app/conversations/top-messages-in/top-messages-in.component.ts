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
    itemPerPage = 10;
    itemsPerPage: any = [];
    items: any = [];
    pageNo = 0;
    totalPages: number;

    constructor(public conversationsService: ConversationsService, public sbs: SidebarService) {

    }

    ngOnInit() {
      if (this.sbs.token) {
        this.analytics_token =  this.sbs.token;
        this.getTopMessageIn();
      }

      this.sbs.botList.subscribe((data) => {
        this.analytics_token = data[0].analytics_token;
        this.getTopMessageIn();
      });

      this.sbs.botData.subscribe((data) => {
        this.analytics_token = data.analytics_token;
        this.getTopMessageIn();
      });
    }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
  }

    getTopMessageIn() {
      this.topMessagesIn = [];
        this.items = [];
      this.conversationsService.getTopMessagesIn(this.analytics_token).subscribe((response) => {
        this.topMessagesIn = response.data;
        if (this.topMessagesIn && this.topMessagesIn.length) {
            for (const i in this.topMessagesIn) {
                this.totalCount = this.totalCount + parseInt(this.topMessagesIn[i].count);
            }
            this.itemsPerPage = this.getItemPerPage(this.topMessagesIn.length);
            this.totalPages = Math.ceil(this.topMessagesIn.length / this.itemPerPage);
            this.getPaginatedData();
        }
      }, (err) => {
        console.log(err);
      });
    }

    getItemPerPage(count) {
        if (count <= 10) {
            return [];
        } else if (count <= 25) {
            return [10, 25];
        } else if (count <= 50) {
            return [10, 25, 50];
        } else {
            return [10, 25, 50, 100];
        }
    }

    goBack() {
        this.pageNo = this.pageNo - 1;
        this.getPaginatedData();
    }

    goAhead() {
        this.pageNo = this.pageNo + 1;
        this.getPaginatedData();
    }

    getItemCount() {
        this.pageNo = 0;
        this.totalPages = Math.ceil(this.topMessagesIn.length / this.itemPerPage);
        this.getPaginatedData();
    }

    getPaginatedData() {
        this.items = [];
        for (let j = (this.pageNo * this.itemPerPage); j < (this.itemPerPage * (this.pageNo + 1)); j++) {
            this.items.push(this.topMessagesIn[j]);
            if (j === this.topMessagesIn.length - 1) {
                break;
            }
        }
    }

    moveToFirstPage() {
        this.pageNo = 0;
        this.getPaginatedData();
    }

}
