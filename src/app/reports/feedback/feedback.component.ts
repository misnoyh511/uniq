import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReportsService} from '../reports.service';
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
    feedback_type: number;
    analytics_token: string;
    itemPerPage = 10;
    itemsPerPage: any = [];
    items: any = [];
    pageNo = 0;
    totalPages: number;
    startDate: any;
    endDate: any;
    constructor(private reportsService: ReportsService, public sbs: SidebarService) {
    }

    ngOnInit() {
        const today = new Date();
        this.endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
            ('0' + (today.getDate())).slice(-2);
        today.setDate(today.getDate() - 30);
        this.startDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
            ('0' + (today.getDate())).slice(-2);
      if (this.sbs.token) {
        this.analytics_token =  this.sbs.token;
        this.feedback_type = this.sbs.feedback_type;
        this.getSession();
      }
        if (Object.keys(this.sbs.savedData).length) {
            this.analytics_token = this.sbs.savedData.analytics_token;
            this.feedback_type = this.sbs.savedData.feedback_type;
            this.getSession();
        }
      this.sbs.botList.subscribe((data) => {
        this.analytics_token = data[0].analytics_token;
        this.feedback_type = data[0].feedback_type;
        this.getSession();
      });

      this.sbs.botData.subscribe((data) => {
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
        this.items = [];
        this.sessions = [];
        if (this.feedback_type) {
        if (this.selectedValue === 'negative') {
          this.reportsService.getNegativeChat(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
              this.itemsPerPage = this.getItemPerPage(this.sessions.length);
              this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
              this.getPaginatedData();
          }, (err) => {
            console.log(err);
          });
        } else if (this.selectedValue === 'positive') {
          this.reportsService.getPositiveChat(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
              this.itemsPerPage = this.getItemPerPage(this.sessions.length);
              this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
              this.getPaginatedData();
          }, (err) => {
            console.log(err);
          });
        } else {
          this.reportsService.getPositiveChat(this.analytics_token, this.startDate, this.endDate).subscribe((positiveRes) => {
            const posValueArr = positiveRes.data.map(function(item){
              return item.text;
            });
            this.reportsService.getNegativeChat(this.analytics_token, this.startDate, this.endDate).subscribe((negativeRes) => {
              const negValueArr = negativeRes.data.map(function(item){
                return item.text;
              });
              const valueArr = posValueArr.concat(negValueArr);
              this.sessions = this.compressArray(valueArr);
                this.itemsPerPage = this.getItemPerPage(this.sessions.length);
                this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
                this.getPaginatedData();
            }, (err) => {
              console.log(err);
            });
          }, (err) => {
            console.log(err);
          });
        }
      } else {
        if (this.selectedValue === 'negative') {
          this.reportsService.getNegativeSession(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
              this.itemsPerPage = this.getItemPerPage(this.sessions.length);
              this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
              this.getPaginatedData();
          }, (err) => {
            console.log(err);
          });
        } else if (this.selectedValue === 'positive') {
          this.reportsService.getPositiveSession(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
            const valueArr = response.data.map(function(item){
              return item.text;
            });
            this.sessions = this.compressArray(valueArr);
              this.itemsPerPage = this.getItemPerPage(this.sessions.length);
              this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
              this.getPaginatedData();
          }, (err) => {
            console.log(err);
          });
        } else {
          this.reportsService.getPositiveSession(this.analytics_token, this.startDate, this.endDate).subscribe((positiveRes) => {
            const posValueArr = positiveRes.data.map(function(item){
              return item.text;
            });
            this.reportsService.getNegativeSession(this.analytics_token, this.startDate, this.endDate).subscribe((negativeRes) => {
              const negValueArr = negativeRes.data.map(function(item){
                return item.text;
              });
              const valueArr = posValueArr.concat(negValueArr);
              this.sessions = this.compressArray(valueArr);
                this.itemsPerPage = this.getItemPerPage(this.sessions.length);
                this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
                this.getPaginatedData();
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
        this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
        this.getPaginatedData();
    }

    getPaginatedData() {
        this.items = [];
        for (let j = (this.pageNo * this.itemPerPage); j < (this.itemPerPage * (this.pageNo + 1)); j++) {
            this.items.push(this.sessions[j]);
            if (j === this.sessions.length - 1) {
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
            this.getSession();
        }
    }

}
