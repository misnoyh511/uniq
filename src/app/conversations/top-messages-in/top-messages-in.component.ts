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
    startDate: any;
    endDate: any;

    constructor(public conversationsService: ConversationsService, public sbs: SidebarService) {

    }

    ngOnInit() {
        if (Object.keys(this.sbs.dateObj).length) {
            this.startDate = this.sbs.dateObj.start;
            this.endDate = this.sbs.dateObj.end;
        } else {
            const today = new Date();
            this.endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                ('0' + (today.getDate())).slice(-2);
            today.setDate(today.getDate() - 30);
            this.startDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                ('0' + (today.getDate())).slice(-2);
        }
      if (this.sbs.token) {
        this.analytics_token =  this.sbs.token;
        this.getTopMessageIn();
      }

        if (Object.keys(this.sbs.savedData).length) {
            this.analytics_token = this.sbs.savedData.analytics_token;
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
      this.conversationsService.getTopMessagesIn(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
        this.topMessagesIn = response.data;
        if (this.topMessagesIn && this.topMessagesIn.length) {
            for (const i in this.topMessagesIn) {
                this.totalCount = this.totalCount + parseInt(this.topMessagesIn[i].count, 10);
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

    onDateChange(event: any) {
        if (event.start && event.end) {
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);
            this.startDate = startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' +
                ('0' + (startDate.getDate())).slice(-2);
            this.endDate = endDate.getFullYear() + '-' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '-' +
                ('0' + (endDate.getDate())).slice(-2);
            this.sbs.dateObj = {
                start: this.startDate,
                end: this.endDate
            };
            this.getTopMessageIn();
        }
    }

}
