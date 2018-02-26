import {Component, OnInit, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck} from '@angular/core';
import {ReportsService} from '../reports.service';
import {Broadcaster} from '../../broadcaster';
import {AppConfig} from '../../app.config';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    providers: [ReportsService]
})
export class FeedbackComponent implements OnInit, DoCheck {
    sessions: any = [];
    selectedValue = 'all';
    feedback_type: string;
    feedbackDiffer: KeyValueDiffer<string, any>;
    constructor(private broadcaster: Broadcaster, private reportsService: ReportsService, private differs: KeyValueDiffers) {
    }

    ngOnInit() {
      this.feedback_type = localStorage.getItem('FEEDBACK_TYPE');
      this.feedbackDiffer = this.differs.find(AppConfig.FEEDBACK_TYPE).create();
      this.registerStringBroadcast();
    }

  feedbackChanged(changes: KeyValueChanges<string, any>) {
    this.feedback_type = localStorage.getItem('FEEDBACK_TYPE');
    this.getSession();
  }

  ngDoCheck(): void {
    const changes = this.feedbackDiffer.diff(AppConfig.FEEDBACK_TYPE);
    if (changes) {
      this.feedbackChanged(changes);
    }
  }

    getSession() {
        if (this.feedback_type === '1') {
        if (this.selectedValue === 'negative') {
          this.reportsService.getNegativeChat().subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
          }, (err) => {
            console.log(err);
          });
        } else if (this.selectedValue === 'positive') {
          this.reportsService.getPositiveChat().subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
          }, (err) => {
            console.log(err);
          });
        } else {
          this.reportsService.getPositiveChat().subscribe((positiveRes) => {
            const posValueArr = positiveRes.data.map(function(item){
              return item.text;
            });
            this.reportsService.getNegativeChat().subscribe((negativeRes) => {
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
          this.reportsService.getNegativeSession().subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
          }, (err) => {
            console.log(err);
          });
        } else if (this.selectedValue === 'positive') {
          this.reportsService.getPositiveSession().subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
          }, (err) => {
            console.log(err);
          });
        } else {
          this.reportsService.getPositiveSession().subscribe((positiveRes) => {
            const posValueArr = positiveRes.data.map(function(item){
              return item.text;
            });
            this.reportsService.getNegativeSession().subscribe((negativeRes) => {
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

  registerStringBroadcast() {
    this.broadcaster.on<string>('BotChanged')
      .subscribe(message => {
        this.feedback_type = localStorage.getItem('FEEDBACK_TYPE');
      });
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
