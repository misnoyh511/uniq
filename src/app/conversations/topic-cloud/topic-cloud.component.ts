import {Component, OnInit, OnDestroy} from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import {ConversationsService} from '../conversations.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-topic-cloud',
    templateUrl: './topic-cloud.component.html',
    styleUrls: ['./topic-cloud.component.css'],
    providers: [ConversationsService, DatePipe]
})
export class TopicCloudComponent implements OnInit, OnDestroy {
    colorCodes = ['#25b6b8', '#a48cd0', '#469ce5', '#f18242', '#ce636d'];
    weight = [6, 8, 10, 9, 7];
    rotate = [-10, 0, 10, 0];
    startDate: any;
    endDate: any;
    analytics_token: string;
    topMessagesIn: any = [];
    options: CloudOptions = {
        // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
        width : 1000,
        height : 400,
        overflow: false,
    };

    data: CloudData[] = [];

    constructor(public conversationsService: ConversationsService, public sbs: SidebarService, private datePipe: DatePipe) {
    }

    ngOnInit() {
        if (Object.keys(this.sbs.dateObj).length) {
            this.startDate = this.sbs.dateObj.start;
            this.endDate = this.sbs.dateObj.end;
        } else {
            this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
            this.startDate = this.datePipe.transform(((new Date()).setDate((new Date()).getDate() - 29)), 'yyyy-MM-dd');
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

    ngOnDestroy() {
        this.sbs.token = this.analytics_token;
    }

    getTopMessageIn() {
        this.topMessagesIn = [];
        this.data = [];
        this.conversationsService.getTopMessagesIn(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
            this.topMessagesIn = response.data;
            if (this.topMessagesIn && this.topMessagesIn.length) {
                for (const i in this.topMessagesIn) {
                    this.data.push({
                        text: this.topMessagesIn[i].text,
                        color: this.colorCodes[(parseInt(i, 10) % (this.colorCodes.length))],
                        rotate: this.rotate[(parseInt(i, 10) % (this.rotate.length))],
                        weight: this.weight[(parseInt(i, 10) % (this.weight.length))]
                    });
                }
            }
        }, (err) => {
            console.log(err);
        });
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
            this.getTopMessageIn();
        }
    }
}
