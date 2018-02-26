import {Component, OnInit} from '@angular/core';
import {ReportsService} from '../reports.service';
import {Broadcaster} from '../../broadcaster';

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
    feedback_type: string;
    constructor(private broadcaster: Broadcaster, private reportsService: ReportsService) {
    }

    ngOnInit() {
      this.feedback_type = localStorage.getItem('FEEDBACK_TYPE');
      this.registerStringBroadcast();
    }

    ngDoCheck() {
      this.feedback_type = localStorage.getItem('FEEDBACK_TYPE');
    }

    getSession() {
        if (this.feedback_type === '1') {
        if (this.selectedValue === 'negative') {
          this.reportsService.getNegativeChat().subscribe((response) => {
            console.log('getNegativeChat', response);
            this.chats = response.data;
          }, (err) => {
            console.log(err);
          });
        } else if (this.selectedValue === 'positive') {
          this.reportsService.getPositiveChat().subscribe((response) => {
            console.log('getPositiveChat', response);
            this.chats = response.data;
          }, (err) => {
            console.log(err);
          });
        } else {
          this.reportsService.getFeedbackChat().subscribe((response) => {
            console.log('getFeedbackChat', response);
            this.chats = response.data;
          }, (err) => {
            console.log(err);
          });
        }
      } else {
        if (this.selectedValue === 'negative') {
          this.reportsService.getNegativeSession().subscribe((response) => {
            console.log('getNegativeSession', response);
            this.chats = response.data;
          }, (err) => {
            console.log(err);
          });
        } else if (this.selectedValue === 'positive') {
          this.reportsService.getPositiveSession().subscribe((response) => {
            console.log('getPositiveSession', response);
            this.chats = response.data;
          }, (err) => {
            console.log(err);
          });
        } else {
          this.reportsService.getFeedbackSession().subscribe((response) => {
            console.log('getFeedbackSession', response);
            this.chats = response.data;
          }, (err) => {
            console.log(err);
          });
        }
      }
    }

  /*getData() {
      if (this.selectedValue === 'negative' && this.selectedData === 'message') {
          this.reportsService.getNegativeChat().subscribe((response) => {
              this.chats = response.data;
          }, (err) => {
              console.log(err);
          });
      }
  }*/

  registerStringBroadcast() {
    this.broadcaster.on<string>('BotChanged')
      .subscribe(message => {
        this.feedback_type = localStorage.getItem('FEEDBACK_TYPE');
      });
  }

}
