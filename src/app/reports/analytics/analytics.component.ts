import {Component, OnInit, OnDestroy} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ReportsService} from '../reports.service';
import * as _ from 'lodash';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

const Highcharts = require('highcharts');

declare var moment: any;

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
    sessions: any = [];
    users: any = [];
    data: any = {};
    options: any = {};
    options1: any = {};
    options2: any = {};
    avg_time = 0;
    startDate: any;
    endDate: any;
    daterange: any = {};
    message: any = [];
    analytics_token: string;
    flag = true;
    sessionOptions = false;
    sessionDays = true;
    sessionWeeks = false;
    sessionMonths = false;
    selectedValueSession = 'Days';
    messageOptions = false;
    messageDays = true;
    messageWeeks = false;
    messageMonths = false;
    selectedValueMessage = 'Days';
    userOptions = false;
    userDays = true;
    userWeeks = false;
    userMonths = false;
    selectedValueUser = 'Days';
    length: number;

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
            this.onLoadData();
        }
        if (Object.keys(this.sbs.savedData).length) {
            this.analytics_token = this.sbs.savedData.analytics_token;
            this.onLoadData();
        }
        this.sbs.botList.subscribe((data) => {
            if (localStorage.getItem('CURRENT_BOT')) {
                this.analytics_token = JSON.parse(localStorage.getItem('CURRENT_BOT')).analytics_token;
            } else {
                this.analytics_token = data[0].analytics_token;
            }
            this.onLoadData();
        });
        this.sbs.botData.subscribe((data) => {
            this.flag = true;
            this.analytics_token = data.analytics_token;
            this.onLoadData();
        });
    }

    ngOnDestroy(): void {
        this.sbs.token = this.analytics_token;
    }

    onLoadData() {
        if (this.flag) {
            this.flag = false;
            this.getAllSessions();
            this.getAllMessages();
            this.getAllUsers();
        }
    }

    getAllSessions() {
        this.options = {};
        this.sessions = [];
        this.reportsService.getAllSession(this.startDate, this.endDate, this.analytics_token).subscribe((response) => {
            this.sessions = JSON.parse(JSON.stringify((response.data)));
            const finalResult = this.getGraphData(response.data, this.selectedValueSession);
            this.totalSessionCount = finalResult.sum;
            if (this.selectedValueSession === 'Days') {
                this.options = this.generateGraphForDays(finalResult);
            } else {
                this.options = this.generateGraphForWeeks(finalResult);
            }
            this.highchartWrapper(response.data);
        }, (err) => {
            console.log(err);
        });
    }

    getAllMessages() {
        this.options1 = {};
        this.reportsService.getMessagePerSession(this.startDate, this.endDate, this.analytics_token).subscribe((response) => {
            this.message = JSON.parse(JSON.stringify((response.data)));
            const finalResult = this.getGraphData(response.data, this.selectedValueMessage);
            this.totalSessionCount = finalResult.sum;
            if (this.selectedValueMessage === 'Days') {
                this.options1 = this.generateGraphForDays(finalResult);
            } else {
                this.options1 = this.generateGraphForWeeks(finalResult);
            }
            this.highchartWrapper(this.message);
        }, (err) => {
            console.log(err);
        });
    }

    getAllUsers() {
        this.options2 = {};
        this.reportsService.getTotalUsers(this.startDate, this.endDate, this.analytics_token).subscribe((response) => {
            this.users = JSON.parse(JSON.stringify((response.data)));
            const finalResult = this.getGraphData(response.data, this.selectedValueUser);
            this.totalSessionCount = finalResult.sum;
            if (this.selectedValueUser === 'Days') {
                this.options2 = this.generateGraphForDays(finalResult);
            } else {
                this.options2 = this.generateGraphForWeeks(finalResult);
            }
            this.highchartWrapper(this.users);
        }, (err) => {
            console.log(err);
        });
    }

    getGraphData(resArray, duration) {
        resArray.forEach(function(element) {
            if (typeof element.date === 'string') {
                const dateParts = element.date.split('T')[0].split('-');
                element.date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            }
        });
        const newArr = {};
        const startDatePart = this.startDate.split('-');
        const endDatePart = this.endDate.split('-');
        for (const currentDay = new Date(startDatePart[0], startDatePart[1] - 1, startDatePart[2]);
             currentDay <= new Date(endDatePart[0], endDatePart[1] - 1, endDatePart[2]);
             currentDay.setDate(currentDay.getDate() + 1)) {
            const day = currentDay;
            let flag = false;
            resArray.forEach(x => {
                if (this.datePipe.transform(x.date, 'yyyy-MM-dd') === this.datePipe.transform(currentDay, 'yyyy-MM-dd')) {
                    flag = true;
                }
            });
            if (!flag) {
                newArr[currentDay.getTime()] = '0';
            }
        }

        Object.keys(newArr).forEach(function (element) {
            resArray.push({
                count: '0',
                date: new Date(parseInt(element, 10))
            });
        });

        resArray = _.sortBy(resArray,
            (item) => {
                return +new Date(item.date);
            });
        let countArray = [];
        let dateArray = [];
        for (const i in resArray) {
            dateArray.push(resArray[i].date);
            if (resArray[i].count) {
                countArray.push(parseInt(resArray[i].count, 10));
            }
        }

        let sum = 0;
        for (let i = 0; i < countArray.length; i++) {
            if (countArray[i] !== null) {
                sum += parseInt(countArray[i], 10);
            }
        }
        this.length = countArray.length;
        let startLabel, endLabel;
        const label = [];
        const finalCount = [];
        let weekCount = 0;
        let startIndex = dateArray[0].getDay();
        if (duration === 'Weeks') {
            for (const i in resArray) {
                resArray[i].day = resArray[i].date.getDay();
            }

            for (const i in resArray) {
                if (startIndex === resArray[i].day) {
                    startLabel = this.datePipe.transform(resArray[i].date, 'M/d');
                    startIndex = 0;
                }

                if (resArray[i].day <= 6) {
                    weekCount = weekCount + parseInt(resArray[i].count, 10);
                    if (resArray[i].day === 6 || parseInt(i, 10) === (resArray.length - 1)) {
                        finalCount.push(weekCount);
                        weekCount = 0;
                    }
                }
                if (resArray[i].day === 6 || parseInt(i, 10) === (resArray.length - 1)) {
                    endLabel = this.datePipe.transform(resArray[i].date, 'M/d');
                }

                if (startLabel && endLabel) {
                    label.push(startLabel + '-' + endLabel);
                    startLabel = '';
                    endLabel = '';
                }
            }
            countArray = finalCount;
            dateArray = label;
        }

        if (duration === 'Months') {
            countArray = [];
            dateArray = [];
            const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (const i in resArray) {
                resArray[i].month = month[resArray[i].date.getMonth()] + '\'' + resArray[i].date.getYear().toString().substr(-2);
                resArray[i].count = parseInt(resArray[i].count, 10);
            }
            const monthData = _.groupBy(resArray, 'month');
            const monthArray = _.map(monthData, function(monthObj) {
                return {date: monthObj[0].month, count: _.sumBy(monthObj, 'count')};
            });
            for (const i in monthArray) {
                countArray.push(monthArray[i].count);
                dateArray.push(monthArray[i].date);
            }
        }

        return {countArray: countArray, dateArray: dateArray, sum: sum};
    }

    generateGraphForDays(finalResult) {
        return {
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
            series: [{
                lineColor: '#6078FF',
                lineWidth: 5,
                color: '#6078FF',
                fillOpacity: 0.1,
                data: finalResult.countArray,
                pointStart: Date.UTC(finalResult.dateArray[0].getYear(),
                    finalResult.dateArray[0].getMonth(), finalResult.dateArray[0].getDate()),
                pointInterval: 24 * 3600 * 1000
            }],
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
                        Highcharts.dateFormat('%b %e', this.x) + '</span> <br> <b style="color:#6078FF; ' +
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
            }
        };
    }

    generateGraphForWeeks(finalResult) {
        return {
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
                categories: finalResult.dateArray,
                labels: {
                    style: {
                        color: '#626597',
                        fontSize: '14px'
                    }
                },
                tickmarkPlacement: 'on'
            },
            series: [{
                lineColor: '#6078FF',
                lineWidth: 5,
                color: '#6078FF',
                fillOpacity: 0.1,
                data: finalResult.countArray
            }],
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
            }
        };
    }

    getSessionOption(value) {
        this.selectedValueSession = value;
        this.options = {};
        const responseData = JSON.parse(JSON.stringify(this.sessions));
        const finalResult = this.getGraphData(responseData, this.selectedValueSession);
        if (value === 'Days') {
            this.options = this.generateGraphForDays(finalResult);
        }
        if (value === 'Weeks' || value === 'Months') {
            this.options = this.generateGraphForWeeks(finalResult);
        }
    }

    getMessageOption(value) {
        this.selectedValueMessage = value;
        this.options1 = {};
        const responseData = JSON.parse(JSON.stringify(this.message));
        const finalResult = this.getGraphData(responseData, this.selectedValueMessage);
        if (value === 'Days') {
            this.options1 = this.generateGraphForDays(finalResult);
        }
        if (value === 'Weeks' || value === 'Months') {
            this.options1 = this.generateGraphForWeeks(finalResult);
        }
    }

    getUserOption(value) {
        this.selectedValueUser = value;
        this.options2 = {};
        const responseData = JSON.parse(JSON.stringify(this.users));
        const finalResult = this.getGraphData(responseData, this.selectedValueUser);
        if (value === 'Days') {
            this.options2 = this.generateGraphForDays(finalResult);
        }
        if (value === 'Weeks' || value === 'Months') {
            this.options2 = this.generateGraphForWeeks(finalResult);
        }
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
            this.flag = true;
            this.onLoadData();
        }
    }

    highchartWrapper(resArray) {
        if (resArray && resArray.length) {
            Highcharts.wrap(Highcharts.Series.prototype, 'drawGraph', function (proceed) {
                proceed.call(this);
                proceed.apply(this, Array.prototype.slice.call(arguments, 1));
                if (this.graph !== undefined) {
                    this.graph.add(this.markerGroup);
                }
            });
        }
    }

}
