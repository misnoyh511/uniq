import {Component, OnInit, OnDestroy} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ReportsService} from '../reports.service';
import * as _ from 'lodash';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
    selector: 'app-reports',
    templateUrl: 'analytics.component.html',
    styleUrls: ['./analytics.component.css'],
    providers: [ReportsService, DatePipe]
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
    avg_time = 0;
    duration = 'Yesterday';
    startDate: any;
    endDate: any;
    daterange: any = {};
    message: any = [];
    public dateOptions: any = {
        locale: {format: 'MM/DD/YYYY'},
        alwaysShowCalendars: false,
    };
    analytics_token: string;

    constructor(private reportsService: ReportsService, public sbs: SidebarService, private datePipe: DatePipe) {

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
            this.analytics_token = this.sbs.token;
            this.onLoadData(this.startDate, this.endDate);
        }
        if (Object.keys(this.sbs.savedData).length) {
            this.analytics_token = this.sbs.savedData.analytics_token;
            this.onLoadData(this.startDate, this.endDate);
        }
        this.sbs.botList.subscribe((data) => {
            this.analytics_token = data[0].analytics_token;
            this.onLoadData(this.startDate, this.endDate);
        });

        this.sbs.botData.subscribe((data) => {
            this.analytics_token = data.analytics_token;
            this.onLoadData(this.startDate, this.endDate);
        });
    }

    ngOnDestroy(): void {
        this.sbs.token = this.analytics_token;
    }

    onLoadData(startDate, endDate) {
        this.options = this.options1 = this.options2 = {};
        this.reportsService.getAllSession(startDate, endDate, this.analytics_token).subscribe((response) => {
            this.sessions = response.data;
            if (response.data && response.data.length) {
                const newArr = {};
                const startDatePart = startDate.split('-');
                const endDatePart = endDate.split('-');
                for (const currentDay = new Date(startDatePart[0], startDatePart[1] - 1, startDatePart[2]);
                     currentDay <= new Date(endDatePart[0], endDatePart[1] - 1, endDatePart[2]);
                     currentDay.setDate(currentDay.getDate() + 1)) {
                    const day = currentDay;
                    let flag = false;
                    response.data.forEach(x => {
                        if (x.date.split('T')[0] === this.datePipe.transform(currentDay, 'yyyy-MM-dd')) {
                            flag = true;
                        }
                    });
                    if (!flag) {
                        newArr[currentDay.getTime()] = '0';
                    }
                }

                for (const j in Object.keys(newArr)) {
                    response.data.push({
                        count: '0',
                        date: new Date(parseInt(Object.keys(newArr)[j], 10))
                    });
                }

                response.data = _.sortBy(response.data,
                    (item) => {
                        return +new Date(item.date);
                    });
                const countArray = [];
                for (const i in response.data) {
                    response.data[i].date = new Date(response.data[i].date);
                    countArray.push(parseInt(response.data[i].count, 10));
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
                const startDatePart = startDate.split('-');
                const endDatePart = endDate.split('-');
                for (const currentDay = new Date(startDatePart[0], startDatePart[1] - 1, startDatePart[2]);
                     currentDay <= new Date(endDatePart[0], endDatePart[1] - 1, endDatePart[2]);
                     currentDay.setDate(currentDay.getDate() + 1)) {
                    const day = currentDay;
                    let flag = false;
                    response.data.forEach(x => {
                        if (x.date.split('T')[0] === this.datePipe.transform(currentDay, 'yyyy-MM-dd')) {
                            flag = true;
                        }
                    });
                    if (!flag) {
                        newArr[currentDay.getTime()] = '0';
                    }
                }
                for (const j in Object.keys(newArr)) {
                    response.data.push({
                        count: '0',
                        date: new Date(parseInt(Object.keys(newArr)[j], 10))
                    });
                }
                response.data = _.sortBy(response.data,
                    (item) => {
                        return +new Date(item.date);
                    });
                const countArray = [];
                for (const i in response.data) {
                    response.data[i].date = new Date(response.data[i].date);
                    countArray.push(parseInt(response.data[i].count, 10));
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
                        name: 'Messages per Session',
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
                const startDatePart = startDate.split('-');
                const endDatePart = endDate.split('-');
                for (const currentDay = new Date(startDatePart[0], startDatePart[1] - 1, startDatePart[2]);
                     currentDay <= new Date(endDatePart[0], endDatePart[1] - 1, endDatePart[2]);
                     currentDay.setDate(currentDay.getDate() + 1)) {
                    const day = currentDay;
                    let flag = false;
                    response.data.forEach(x => {
                        if (x.date.split('T')[0] === this.datePipe.transform(currentDay, 'yyyy-MM-dd')) {
                            flag = true;
                        }
                    });
                    if (!flag) {
                        newArr[currentDay.getTime()] = '0';
                    }
                }
                for (const j in Object.keys(newArr)) {
                    response.data.push({
                        count: '0',
                        date: new Date(parseInt(Object.keys(newArr)[j], 10))
                    });
                }
                response.data = _.sortBy(response.data,
                    (item) => {
                        return +new Date(item.date);
                    });
                const countArray = [];
                for (const i in response.data) {
                    response.data[i].date = new Date(response.data[i].date);
                    countArray.push(parseInt(response.data[i].count, 10));
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
            this.onLoadData(this.startDate, this.endDate);
        }
    }

}
