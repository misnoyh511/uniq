import {Component, OnInit} from '@angular/core';
import {ReportsService} from '../reports.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    providers: [ReportsService]
})
export class FeedbackComponent implements OnInit {
    chats: any = [];
    sessions: any = [];
    selectedValue = 'all';
    selectedData = 'session';
    constructor(private reportsService: ReportsService) {
    }

    ngOnInit() {
        this.reportsService.getAllSession().subscribe((response) => {
            this.sessions = response.data;
            //console.log("sessionsis================", this.sessions);
        }, (err) => {
            console.log(err);
        });
    }
    getSession() {
        if (this.selectedValue === 'negative' && this.selectedData === 'session') {
            this.reportsService.getNegativeSession().subscribe((response) => {
                this.sessions = response.data;
            }, (err) => {
                console.log(err);
            });
        }
    }

    getData() {
        if (this.selectedValue === 'negative' && this.selectedData === 'message') {
            this.reportsService.getNegativeChat().subscribe((response) => {
                this.chats = response.data;
            }, (err) => {
                console.log(err);
            });
        }
    }

}
