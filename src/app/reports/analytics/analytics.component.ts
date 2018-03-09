import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReportsService} from '../reports.service';
import * as _ from 'lodash';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-reports',
  templateUrl: 'analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [ReportsService]
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  sessions: string;
  users: string;
  data: any = {};
  options: any = {};
  options1: any = {};
  options2: any = {};
  openDropdown = false;
  showAvgtip = false;
  showUsertip = false;
  showMsgtip = false;
  showSessiontip = false;
  selectValue1 = false;
  selectValue2 = false;
  selectValue3 = false;
  avg_time = 0;
  duration = 'Yesterday';
  today = new Date();
  startDate: any;
  endDate: any;
  daterange: any = {};
  message: any = [];
  public dateOptions: any = {
    locale: {format: 'MM/DD/YYYY'},
    alwaysShowCalendars: false,
  };
  analytics_token: string;

  constructor(private reportsService: ReportsService, public sbs: SidebarService) {

  }

  ngOnInit() {
    if (this.sbs.token) {
      this.analytics_token =  this.sbs.token;
      this.initFun();
    }
    this.sbs.subject.subscribe((data) => {
      this.analytics_token = data[0].analytics_token;
      this.initFun();
    });

    this.sbs.broadC.subscribe((data) => {
      this.analytics_token = data.analytics_token;
      this.onLoadData(this.startDate, this.endDate);
    });
  }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
  }

  initFun() {
    this.endDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (this.today.getDate())).slice(-2);
    if (this.duration === 'Yesterday') {
      this.today.setDate(this.today.getDate() - 1);
      this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
        ('0' + (this.today.getDate())).slice(-2);
    }
    this.onLoadData(this.startDate, this.endDate);
  }

  selectData(data) {
    this.duration = data;
    this.openDropdown = !this.openDropdown;
    this.today = new Date();
    this.endDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (this.today.getDate())).slice(-2);
    if (this.duration === 'Yesterday') {
      this.today.setDate(this.today.getDate() - 1);
      this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
        ('0' + (this.today.getDate())).slice(-2);
    } else if (this.duration === 'Last 7 Days') {
      this.today.setDate(this.today.getDate() - 7);
      this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
        ('0' + (this.today.getDate())).slice(-2);
    } else if (this.duration === 'Last 30 Days') {
      this.today.setDate(this.today.getDate() - 30);
      this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
        ('0' + (this.today.getDate())).slice(-2);
    }
    this.onLoadData(this.startDate, this.endDate);
  }

  onLoadData(startDate, endDate) {
    this.options = this.options1 = this.options2 = {};
    this.reportsService.getAllSession(startDate, endDate, this.analytics_token).subscribe((response) => {
      this.sessions = response.data;
      if (response.data && response.data.length) {
        const newArr = {};
        for (const currentDay = new Date(startDate); currentDay <= new Date(endDate); currentDay.setDate(currentDay.getDate() + 1)) {
          const day = currentDay;
          let flag = false;
          response.data.forEach( x => {
            if (x.date === currentDay.toISOString()) {
              flag = true;
            }
          });
          if (!flag) {
            newArr[currentDay.getTime()] = '0';
          }
        }
        for (let j in Object.keys(newArr)) {
          response.data.push({
            count: '0',
            date: new Date(parseInt(Object.keys(newArr)[j]))
          });
        }

        response.data = _.sortBy(response.data,
          (item) => {
            return +new Date(item.date);
          });
        const countArray = [];
          for (const i in response.data) {
            response.data[i].date = new Date(response.data[i].date);
            countArray.push(parseInt(response.data[i].count));
          }
          this.options = {
            title: {
              text: ''
            },

            subtitle: {
              text: ''
            },

            xAxis: {
              type: 'datetime'
            },

            yAxis: {
              title: {
                text: 'Count'
              }
            },

            plotOptions: {
              series: {
                label: {
                  connectorAllowed: false
                },
                pointStart: Date.UTC(response.data[0].date.getFullYear(), response.data[0].date.getMonth(),
                  response.data[0].date.getDate()),
                pointInterval: 24 * 3600 * 1000
              }
            },

            series: [{
              name: 'Session Count',
              data: countArray
            }],

            responsive: {
              rules: [{
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                  }
                }
              }]
            }
          };
        }
    }, (err) => {
      console.log(err);
    });

    this.reportsService.getMessagePerSession(startDate, endDate, this.analytics_token).subscribe((response) => {
      this.message = response.data;
      if (response.data && response.data.length) {
        const newArr = {};
        for (const currentDay = new Date(startDate); currentDay <= new Date(endDate); currentDay.setDate(currentDay.getDate() + 1)) {
          const day = currentDay;
          let flag = false;
          response.data.forEach( x => {
            if (x.date === currentDay.toISOString()) {
              flag = true;
            }
          });
          if (!flag) {
            newArr[currentDay.getTime()] = '0';
          }
        }
        for (let j in Object.keys(newArr)) {
          response.data.push({
            count: '0',
            date: new Date(parseInt(Object.keys(newArr)[j]))
          });
        }
        response.data = _.sortBy(response.data,
          (item) => {
            return +new Date(item.date);
          });
        const countArray = [];
        for (const i in response.data) {
          response.data[i].date = new Date(response.data[i].date);
          countArray.push(parseInt(response.data[i].count));
        }
        this.options1 = {
          title: {
            text: ''
          },

          subtitle: {
            text: ''
          },

          xAxis: {
            type: 'datetime'
          },

          yAxis: {
            title: {
              text: 'Count'
            }
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              },
              pointStart: Date.UTC(response.data[0].date.getFullYear(), response.data[0].date.getMonth(),
                response.data[0].date.getDate()),
              pointInterval: 24 * 3600 * 1000
            }
          },

          series: [{
            name: 'Session Count',
            data: countArray
          }],

          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }
        };
      }
    }, (err) => {
      console.log(err);
    });

    this.reportsService.getTotalUsers(startDate, endDate, this.analytics_token).subscribe((response) => {
      this.users = response.data;
      if (response.data && response.data.length) {
        const newArr = {};
        for (const currentDay = new Date(startDate); currentDay <= new Date(endDate); currentDay.setDate(currentDay.getDate() + 1)) {
          const day = currentDay;
          let flag = false;
          response.data.forEach( x => {
            if (x.date === currentDay.toISOString()) {
              flag = true;
            }
          });
          if (!flag) {
            newArr[currentDay.getTime()] = '0';
          }
        }
        for (let j in Object.keys(newArr)) {
          response.data.push({
            count: '0',
            date: new Date(parseInt(Object.keys(newArr)[j]))
          });
        }
        response.data = _.sortBy(response.data,
          (item) => {
            return +new Date(item.date);
          });
        const countArray = [];
        for (const i in response.data) {
          response.data[i].date = new Date(response.data[i].date);
          countArray.push(parseInt(response.data[i].count));
        }
        this.options2 = {
          title: {
            text: ''
          },

          subtitle: {
            text: ''
          },

          xAxis: {
            type: 'datetime'
          },

          yAxis: {
            title: {
              text: 'Users'
            }
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              },
              pointStart: Date.UTC(response.data[0].date.getFullYear(), response.data[0].date.getMonth(),
                response.data[0].date.getDate()),
              pointInterval: 24 * 3600 * 1000
            }
          },

          series: [{
            name: 'User Count',
            data: countArray
          }],

          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }
        };
      }
    }, (err) => {
      console.log(err);
    });

    this.reportsService.getAvgTtime(startDate, endDate, this.analytics_token).subscribe((response) => {
      this.data = response.data;
      let sum = 0;
      for (const i in response.data) {
        sum = sum + response.data[i].avg_time;
      }
      this.avg_time = sum / response.data.length;
    }, (err) => {
      console.log(err);
    });
  }

  public selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  getDateRange() {
    this.openDropdown = !this.openDropdown;
    this.startDate = this.daterange.start._d.getFullYear() + '-' + ('0' + (this.daterange.start._d.getMonth() + 1)).slice(-2) +
      '-' + ('0' + (this.daterange.start._d.getDate())).slice(-2);
    this.endDate = this.daterange.end._d.getFullYear() + '-' + ('0' + (this.daterange.end._d.getMonth() + 1)).slice(-2) +
      '-' + ('0' + (this.daterange.end._d.getDate())).slice(-2);
    this.duration = this.startDate.replace(/-/g, '/') + ' - ' + this.endDate.replace(/-/g, '/');
    this.onLoadData(this.startDate, this.endDate);
  }

}
