import {Component, OnInit, OnDestroy} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ReportsService} from '../reports.service';
import * as _ from 'lodash';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
const Highcharts = require('highcharts');

@Component({
    selector: 'app-reports',
    templateUrl: 'analytics.component.html',
    styleUrls: ['./analytics.component.css'],
    providers: [ReportsService, DatePipe]
})
export class AnalyticsComponent implements OnInit, OnDestroy {
    totalSessionCount: number;
    totalMesasgeCount: number;
    totalUserCount: number;
    sessions: string;
    users: string;
    data: any = {};
    options: any = {};
    options1: any = {};
    options2: any = {};
    showAvgtip = false;
    showUsertip = false;
    showMsgtip = false;
    showSessiontip = false;
    avg_time = 0;
    startDate: any;
    endDate: any;
    daterange: any = {};
    message: any = [];
    analytics_token: string;

    constructor(private reportsService: ReportsService, public sbs: SidebarService, private datePipe: DatePipe) {

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
            this.onLoadData(this.startDate, this.endDate);
        }
        if (Object.keys(this.sbs.savedData).length) {
            this.analytics_token = this.sbs.savedData.analytics_token;
            this.onLoadData(this.startDate, this.endDate);
        }
        this.sbs.botList.subscribe((data) => {
            if (localStorage.getItem('CURRENT_BOT')) {
                this.analytics_token = JSON.parse(localStorage.getItem('CURRENT_BOT')).analytics_token;
            } else {
                this.analytics_token = data[0].analytics_token;
            }
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
        const month = {
            '01': 'Jan',
            '02': 'Feb',
            '03': 'Mar',
            '04': 'Apr',
            '05': 'May',
            '06': 'Jun',
            '07': 'Jul',
            '08': 'Aug',
            '09': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec'
        };
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

                Object.keys(newArr).forEach(function (element) {
                    response.data.push({
                        count: '0',
                        date: new Date(parseInt(element, 10))
                    });
                });

                response.data = _.sortBy(response.data,
                    (item) => {
                        return +new Date(item.date);
                    });
                const countArray = [];
                const dateArray = [];
                response.data.forEach(function (element) {
                    if (typeof element.date === 'string') {
                        const dateParts = element.date.split('-');
                        dateParts[2] = parseInt(dateParts[2], 10); // for removing leading zeroes
                        dateArray.push(month[dateParts[1]] + ' ' + dateParts[2]);
                    } else {
                        const dateParts = element.date.toString().split(' ');
                        dateArray.push(dateParts[1] + ' ' + dateParts[2]);
                    }
                    if (element.count) {
                        countArray.push(parseInt(element.count, 10));
                    }
                });

                let sum = 0;
                for (let i = 0; i < countArray.length; i++) {
                    if (countArray[i] !== null) {
                        sum += parseInt(countArray[i], 10);
                    }
                }
                this.totalSessionCount = sum;
                this.options = {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: ''
                    },

                    subtitle: {
                        text: ''
                    },

                    xAxis: {
                        type: 'datetime',
                        categories: dateArray,
                        dateTimeLabelFormats: {
                            day: '%b %e'
                        },
                        labels: {
                            style: {
                                color: '#626597',
                                fontSize: '14px'
                            }
                        },
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'Count'
                        },
                        gridLineColor: '#fafafa',
                        labels: {
                            formatter: function () {
                                return this.value;
                            },
                            style: {
                                color: '#626597',
                                fontSize: '14px'
                            }
                        }
                    },

                    tooltip: {
                        formatter: function () {
                            return '<span style="font-size:12px; color:#7171A6;line-height: 1.3;">' +
                                this.x + '</span> <br> <b style="color:#6078FF; ' +
                                'font-weight:bold; font-size:16px; line-height:24px;">' + this.y + '</b>';
                        },
                        backgroundColor: null,
                        borderWidth: 0,
                        shadow: false,
                        useHTML: true,
                        style: {
                            padding: 0
                        }
                    },

                    plotOptions: {
                        area: {
                            type: 'percent',
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                fillColor: '#6078FF',
                                radius: 7,
                                states: {
                                    hover: {
                                        enabled: true,
                                        fillColor: '#fff',
                                        lineColor: '#6078FF',
                                        lineWidth: 3,
                                        radius: 10
                                    }
                                },
                                zIndex: 100
                            },
                            events: {
                                mouseOver: function () {
                                    this.update({
                                        marker: {
                                            enabled: true
                                        }
                                    });
                                }, mouseOut: function () {
                                    this.update({
                                        marker: {
                                            enabled: false
                                        }
                                    });
                                }
                            }
                        },
                        series: {
                            connectNulls: true
                        }
                    },
                    series: [{
                        lineColor: '#6078FF',
                        lineWidth: 5,
                        color: '#6078FF',
                        fillOpacity: 0.1,
                        data: countArray
                    }]
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
                Object.keys(newArr).forEach(function (element) {
                    response.data.push({
                        count: '0',
                        date: new Date(parseInt(element, 10))
                    });
                });
                response.data = _.sortBy(response.data,
                    (item) => {
                        return +new Date(item.date);
                    });
                const msgCountArray = [];
                const msgDateArray = [];
                response.data.forEach(function (element) {
                    if (typeof element.date === 'string') {
                        const dateParts = element.date.split('-');
                        dateParts[2] = parseInt(dateParts[2], 10); // for removing leading zeroes
                        msgDateArray.push(month[dateParts[1]] + ' ' + dateParts[2]);
                    } else {
                        const dateParts = element.date.toString().split(' ');
                        msgDateArray.push(dateParts[1] + ' ' + dateParts[2]);
                    }
                    if (element.count) {
                        msgCountArray.push(parseInt(element.count, 10));
                    }
                });

                let sum = 0;
                for (let i = 0; i < msgCountArray.length; i++) {
                    if (msgCountArray[i] !== null) {
                        sum += parseInt(msgCountArray[i], 10);
                    }
                }
                this.totalMesasgeCount = sum;
                this.options1 = {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: ''
                    },

                    subtitle: {
                        text: ''
                    },

                    xAxis: {
                        type: 'datetime',
                        categories: msgDateArray,
                        dateTimeLabelFormats: {
                            day: '%b %e'
                        },
                        labels: {
                            style: {
                                color: '#626597',
                                fontSize: '14px'
                            }
                        },
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'Message Count'
                        },
                        gridLineColor: '#fafafa',
                        labels: {
                            formatter: function () {
                                return this.value;
                            },
                            style: {
                                color: '#626597',
                                fontSize: '14px'
                            }
                        }
                    },

                    tooltip: {
                        formatter: function () {
                            return '<span style="font-size:12px; color:#7171A6;line-height: 1.3;">' +
                                this.x + '</span> <br> <b style="color:#6078FF; ' +
                                'font-weight:bold; font-size:16px; line-height:24px;">' + this.y + '</b>';
                        },
                        backgroundColor: null,
                        borderWidth: 0,
                        shadow: false,
                        useHTML: true,
                        style: {
                            padding: 0
                        }
                    },

                    plotOptions: {
                        area: {
                            type: 'percent',
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                fillColor: '#6078FF',
                                radius: 7,
                                states: {
                                    hover: {
                                        enabled: true,
                                        fillColor: '#fff',
                                        lineColor: '#6078FF',
                                        lineWidth: 3,
                                        radius: 10
                                    }
                                },
                                zIndex: 100
                            },
                            events: {
                                mouseOver: function () {
                                    this.update({
                                        marker: {
                                            enabled: true
                                        }
                                    });
                                }, mouseOut: function () {
                                    this.update({
                                        marker: {
                                            enabled: false
                                        }
                                    });
                                }
                            }
                        },
                        series: {
                            connectNulls: true
                        }
                    },
                    series: [{
                        lineColor: '#6078FF',
                        lineWidth: 4,
                        color: '#6078FF',
                        fillOpacity: 0.1,
                        data: msgCountArray
                    }]
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
                Object.keys(newArr).forEach(function (element) {
                    response.data.push({
                        count: '0',
                        date: new Date(parseInt(element, 10))
                    });
                });
                response.data = _.sortBy(response.data,
                    (item) => {
                        return +new Date(item.date);
                    });
                const countArray = [];
                const dateArray = [];
                response.data.forEach(function (element) {
                    if (typeof element.date === 'string') {
                        const dateParts = element.date.split('-');
                        dateParts[2] = parseInt(dateParts[2], 10); // for removing leading zeroes
                        dateArray.push(month[dateParts[1]] + ' ' + dateParts[2]);
                    } else {
                        const dateParts = element.date.toString().split(' ');
                        dateArray.push(dateParts[1] + ' ' + dateParts[2]);
                    }
                    if (element.count) {
                        countArray.push(parseInt(element.count, 10));
                    }
                });
                let sum = 0;
                for (let i = 0; i < countArray.length; i++) {
                    if (countArray[i] !== null) {
                        sum += parseInt(countArray[i], 10);
                    }
                }
                this.totalUserCount = sum;
                this.options2 = {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: ''
                    },

                    subtitle: {
                        text: ''
                    },

                    xAxis: {
                        type: 'datetime',
                        categories: dateArray,
                        dateTimeLabelFormats: {
                            day: '%b %e'
                        },
                        labels: {
                            style: {
                                color: '#626597',
                                fontSize: '14px'
                            }
                        },
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        title: {
                            text: 'Users'
                        },
                        gridLineColor: '#fafafa',
                        labels: {
                            formatter: function () {
                                return this.value;
                            },
                            style: {
                                color: '#626597',
                                fontSize: '14px'
                            }
                        }
                    },

                    tooltip: {
                        formatter: function () {
                            return '<span style="font-size:12px; color:#7171A6;line-height: 1.3;">' +
                                this.x + '</span> <br> <b style="color:#6078FF; ' +
                                'font-weight:bold; font-size:16px; line-height:24px;">' + this.y + '</b>';
                        },
                        backgroundColor: null,
                        borderWidth: 0,
                        shadow: false,
                        useHTML: true,
                        style: {
                            padding: 0
                        }
                    },

                    plotOptions: {
                        area: {
                            type: 'percent',
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                fillColor: '#6078FF',
                                radius: 7,
                                states: {
                                    hover: {
                                        enabled: true,
                                        fillColor: '#fff',
                                        lineColor: '#6078FF',
                                        lineWidth: 3,
                                        radius: 10
                                    }
                                },
                                zIndex: 100
                            },
                            events: {
                                mouseOver: function () {
                                    this.update({
                                        marker: {
                                            enabled: true
                                        }
                                    });
                                }, mouseOut: function () {
                                    this.update({
                                        marker: {
                                            enabled: false
                                        }
                                    });
                                }
                            }
                        },
                        series: {
                            connectNulls: true
                        }
                    },
                    series: [{
                        lineColor: '#6078FF',
                        lineWidth: 4,
                        color: '#6078FF',
                        fillOpacity: 0.1,
                        data: countArray
                    }]
                };
            }
        }, (err) => {
            console.log(err);
        });

        this.reportsService.getAvgTtime(startDate, endDate, this.analytics_token).subscribe((response) => {
            this.data = response.data;
            let sum = 0;
            response.data.forEach(function (element) {
                sum = sum + element.avg_time;
            });
            this.avg_time = sum / response.data.length;
        }, (err) => {
            console.log(err);
        });
        Highcharts.wrap(Highcharts.Series.prototype, 'drawGraph', function (proceed) {
            proceed.call(this);
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            this.graph.add(this.markerGroup);
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
            localStorage.setItem('DATE_OBJ', JSON.stringify(this.sbs.dateObj));
            this.onLoadData(this.startDate, this.endDate);
        }
    }

}
