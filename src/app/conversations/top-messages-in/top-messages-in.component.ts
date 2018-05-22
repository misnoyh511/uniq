import {Component, OnInit, OnDestroy} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ConversationsService} from '../conversations.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
    selector: 'app-top-messages-in',
    templateUrl: './top-messages-in.component.html',
    styleUrls: ['./top-messages-in.component.css'],
    providers: [ConversationsService, DatePipe]
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

    constructor(public conversationsService: ConversationsService, public sbs: SidebarService, private datePipe: DatePipe) {

    }

    ngOnInit() {
        if (localStorage.getItem('DATE_OBJ')) {
            this.startDate = JSON.parse(localStorage.getItem('DATE_OBJ')).start;
            this.endDate = JSON.parse(localStorage.getItem('DATE_OBJ')).end;
        } else if (Object.keys(this.sbs.dateObj).length) {
            this.startDate = this.sbs.dateObj.start;
            this.endDate = this.sbs.dateObj.end;
        } else {
            this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
            this.startDate = this.datePipe.transform(((new Date()).setDate((new Date()).getDate() - 29)), 'yyyy-MM-dd');
        }

        if (this.sbs.token) {
            this.analytics_token = this.sbs.token;
            this.getTopMessageIn();
        }

        if (Object.keys(this.sbs.savedData).length) {
            this.analytics_token = this.sbs.savedData.analytics_token;
            this.getTopMessageIn();
        }

        this.sbs.botList.subscribe((data) => {
            if (localStorage.getItem('CURRENT_BOT')) {
                this.analytics_token = JSON.parse(localStorage.getItem('CURRENT_BOT')).analytics_token;
            } else {
                this.analytics_token = data[0].analytics_token;
            }
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
            this.totalCount = 0;
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
            this.startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
            this.endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
            this.sbs.dateObj = {
                start: this.startDate,
                end: this.endDate
            };
            localStorage.setItem('DATE_OBJ', JSON.stringify(this.sbs.dateObj));
            this.getTopMessageIn();
        }
    }

}
