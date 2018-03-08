import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReportsService} from '../reports.service';
import {AppConfig} from '../../app.config';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    providers: [ReportsService]
})
export class FeedbackComponent implements OnInit, OnDestroy {
    sessions: any = [];
    selectedValue = 'all';
    feedback_type: string;
    analytics_token: string;
    constructor(private reportsService: ReportsService, public sbs: SidebarService) {
    }

    ngOnInit() {
      if (this.sbs.token) {
        this.analytics_token =  this.sbs.token;
        this.feedback_type = this.sbs.token;
        this.getSession();
      }
      this.sbs.subject.subscribe((data) => {
        this.analytics_token = data[0].analytics_token;
        this.feedback_type = data[0].feedback_type;
        this.getSession();
      });

      this.sbs.broadC.subscribe((data) => {

        this.analytics_token = data.analytics_token;
        this.feedback_type = data.feedback_type;
        this.getSession();
      });
    }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
    this.sbs.feedback_type = this.feedback_type;
  }

    getSession() {
        if (this.feedback_type === '1') {
        if (this.selectedValue === 'negative') {
          this.reportsService.getNegativeChat(this.analytics_token).subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
          }, (err) => {
            console.log(err);
          });
        } else if (this.selectedValue === 'positive') {
          this.reportsService.getPositiveChat(this.analytics_token).subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
          }, (err) => {
            console.log(err);
          });
        } else {
          this.reportsService.getPositiveChat(this.analytics_token).subscribe((positiveRes) => {
            const posValueArr = positiveRes.data.map(function(item){
              return item.text;
            });
            this.reportsService.getNegativeChat(this.analytics_token).subscribe((negativeRes) => {
              const negValueArr = negativeRes.data.map(function(item){
                return item.text;
              });
              const valueArr = posValueArr.concat(negValueArr);
              this.sessions = this.compressArray(valueArr);
            }, (err) => {
              console.log(err);
            });
          }, (err) => {
            console.log(err);
          });
        }
      } else {
        if (this.selectedValue === 'negative') {
          this.reportsService.getNegativeSession(this.analytics_token).subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
          }, (err) => {
            console.log(err);
          });
        } else if (this.selectedValue === 'positive') {
          this.reportsService.getPositiveSession(this.analytics_token).subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
          }, (err) => {
            console.log(err);
          });
        } else {
          this.reportsService.getPositiveSession(this.analytics_token).subscribe((positiveRes) => {
            const posValueArr = positiveRes.data.map(function(item){
              return item.text;
            });
            this.reportsService.getNegativeSession(this.analytics_token).subscribe((negativeRes) => {
              const negValueArr = negativeRes.data.map(function(item){
                return item.text;
              });
              const valueArr = posValueArr.concat(negValueArr);
              this.sessions = this.compressArray(valueArr);
            }, (err) => {
              console.log(err);
            });
          }, (err) => {
            console.log(err);
          });
        }
      }
    }

  compressArray(original) {
    const compressed = [];
    // make a copy of the input array
    const copy = original.slice(0);

    // first loop goes over every element
    for (let i = 0; i < original.length; i++) {

      let myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (let w = 0; w < copy.length; w++) {
        if (original[i] === copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      if (myCount > 0) {
        const a = new Object();
        a['msg'] = original[i];
        a['count'] = myCount;
        compressed.push(a);
      }
    }

    return compressed;
  }

}
