import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReportsService} from '../reports.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {ArraySortPipe} from '../../directives/sort.directive';
import * as _ from 'lodash';
import {DatePipe} from '@angular/common';

const Highcharts = require('highcharts');

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    providers: [ReportsService, ArraySortPipe, DatePipe]
})
export class FeedbackComponent implements OnInit, OnDestroy {
    sessions: any = [];
    selectedValue = 'All';
    feedback_type: number;
    analytics_token: string;
    itemPerPage = 10;
    itemsPerPage: any = [];
    items: any = [];
    pageNo = 0;
    totalPages: number;
    startDate: any;
    endDate: any;
    options: any = {};
    totalAvg: string;
    showOptions = false;
    showAll = true;
    showPositive = false;
    showNegative = false;
    feedbackOptions = false;
    showDays = true;
    showWeeks = false;
    showMonths = false;
    selectedValueFeedback = 'Days';
    feedbackArr: any = [];

    constructor(private reportsService: ReportsService, public sbs: SidebarService, private sort: ArraySortPipe,
                private datePipe: DatePipe) {
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
        if (this.sbs.token && this.sbs.feedback_type) {
            this.analytics_token = this.sbs.token;
            this.feedback_type = this.sbs.feedback_type;
            this.getSession();
        } else if (Object.keys(this.sbs.savedData).length) {
            this.analytics_token = this.sbs.savedData.analytics_token;
            this.feedback_type = parseInt(this.sbs.savedData.feedback_type, 10);
            this.getSession();
        }
        this.sbs.botList.subscribe((data) => {
            if (localStorage.getItem('CURRENT_BOT')) {
                this.feedback_type = JSON.parse(localStorage.getItem('CURRENT_BOT')).feedback_type;
                this.analytics_token = JSON.parse(localStorage.getItem('CURRENT_BOT')).analytics_token;
            } else {
                this.feedback_type = data[0].feedback_type;
                this.analytics_token = data[0].analytics_token;
            }
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

    getOption(value) {
        this.selectedValue = value;
        this.getSession();
    }

    getFeedbackOption(value) {
        this.selectedValueFeedback = value;
        const finalArray = [];
        const feedbackArray = JSON.parse(JSON.stringify(this.feedbackArr));
        feedbackArray.forEach(function (element, index) {
            finalArray.push({
                text: element.text,
                created_at: new Date(element.created_at)
            });
        });
        this.getGraphData(finalArray).then((finalResult: any) => {
            this.options = this.generateGraph(finalResult);
        });
    }

    getSession() {
        this.items = [];
        this.sessions = [];
        this.totalAvg = '';
        if (this.feedback_type) {
            if (this.selectedValue === 'Negative') {
                this.getNegativeChat();
            } else if (this.selectedValue === 'Positive') {
                this.getPositiveChat();
            } else {
                this.getFeedbackChat();
                this.getAllChats();
            }
        } else {
            if (this.selectedValue === 'Negative') {
                this.getNegativeSession();
            } else if (this.selectedValue === 'Positive') {
                this.getPositiveSession();
            } else {
                this.getFeedbackSession();
                this.getAllSessions();
            }
        }
    }

    getNegativeChat() {
        this.reportsService.getNegativeChat(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
            const valueArr = response.data.map(function (item) {
                let data = {};
                data = {
                    text: item.text,
                    status: 'negative',
                    created_at: item.created_at
                };
                return data;
            });
            this.sessions = this.compressArray(valueArr);
            this.itemsPerPage = this.getItemPerPage(this.sessions.length);
            this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
            this.getPaginatedData();
        }, (err) => {
            console.log(err);
        });
    }

    getPositiveChat() {
        this.reportsService.getPositiveChat(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
            const valueArr = response.data.map(function (item) {
                let data = {};
                data = {
                    text: item.text,
                    status: 'positive',
                    created_at: item.created_at
                };
                return data;
            });
            this.sessions = this.compressArray(valueArr);
            this.itemsPerPage = this.getItemPerPage(this.sessions.length);
            this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
            this.getPaginatedData();
        }, (err) => {
            console.log(err);
        });
    }

    getNegativeSession() {
        this.reportsService.getNegativeSession(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
            const valueArr = response.data.map(function (item) {
                let data = {};
                data = {
                    text: item.text,
                    status: 'negative',
                    created_at: item.created_at
                };
                return data;
            });
            this.sessions = this.compressArray(valueArr);
            this.itemsPerPage = this.getItemPerPage(this.sessions.length);
            this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
            this.getPaginatedData();
        }, (err) => {
            console.log(err);
        });
    }

    getPositiveSession() {
        this.reportsService.getPositiveSession(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
            const valueArr = response.data.map(function (item) {
                let data = {};
                data = {
                    text: item.text,
                    status: 'positive',
                    created_at: item.created_at
                };
                return data;
            });
            this.sessions = this.compressArray(valueArr);
            this.itemsPerPage = this.getItemPerPage(this.sessions.length);
            this.totalPages = Math.ceil(this.sessions.length / this.itemPerPage);
            this.getPaginatedData();
        }, (err) => {
            console.log(err);
        });
    }

    getFeedbackChat() {
        this.reportsService.getFeedbackChat(this.analytics_token, this.startDate, this.endDate).subscribe((res) => {
            this.options = {};
            const feedbackData = [];
            this.highchartWrapper(res.data);
            res.data.forEach(function (element) {
                const dateParts = element.date.split('T')[0].split('-');
                feedbackData.push({
                    text: element.feedback,
                    created_at: new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
                });
            });
            const data = this.insertDates(feedbackData);
            this.feedbackArr = JSON.parse(JSON.stringify(data));
            this.getGraphData(data).then((finalResult: any) => {
                this.options = this.generateGraph(finalResult);
            });
        }, (err) => {
            console.log(err);
        });
    }

    getFeedbackSession() {
        this.reportsService.getFeedbackSession(this.analytics_token, this.startDate, this.endDate).subscribe((res) => {
            const feedbackData = [];
            this.options = {};
            this.highchartWrapper(res.data);
            res.data.forEach(function (element) {
                feedbackData.push({
                    text: element.feedback,
                    created_at: element.date
                });
            });
            const data = this.insertDates(feedbackData);
            this.feedbackArr = JSON.parse(JSON.stringify(data));
            this.getGraphData(data).then((finalResult: any) => {
                this.options = this.generateGraph(finalResult);
            });
        }, (err) => {
            console.log(err);
        });
    }

    getAllChats() {
        this.reportsService.getPositiveChat(this.analytics_token, this.startDate, this.endDate).subscribe((positiveRes) => {
            const posData = this.insertDates(positiveRes.data);
            const posValueArr = posData.map(function (item) {
                let data = {};
                data = {
                    text: item.text,
                    status: 'positive',
                    created_at: item.created_at
                };
                return data;
            });
            this.reportsService.getNegativeChat(this.analytics_token, this.startDate, this.endDate).subscribe((negativeRes) => {
                const negData = this.insertDates(negativeRes.data);
                const negValueArr = negData.map(function (item) {
                    let data = {};
                    data = {
                        text: item.text,
                        status: 'negative',
                        created_at: item.created_at
                    };
                    return data;
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

    getAllSessions() {
        this.reportsService.getPositiveSession(this.analytics_token, this.startDate, this.endDate).subscribe((positiveRes) => {
            const posData = this.insertDates(positiveRes.data);
            const posValueArr = posData.map(function (item) {
                let data = {};
                data = {
                    text: item.text,
                    status: 'positive',
                    created_at: item.created_at
                };
                return data;
            });
            this.reportsService.getNegativeSession(this.analytics_token, this.startDate, this.endDate).subscribe((negativeRes) => {
                const negData = this.insertDates(negativeRes.data);
                const negValueArr = negData.map(function (item) {
                    let data = {};
                    data = {
                        text: item.text,
                        status: 'negative',
                        created_at: item.created_at
                    };
                    return data;
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

    compressArray(original) {
        const compressed = [];
        // make a copy of the input array
        const copy = original.slice(0);

        // first loop goes over every element
        for (let i = 0; i < original.length; i++) {

            let myCount = 0;
            // loop over every element in the copy and see if it's the same
            for (let w = 0; w < copy.length; w++) {
                if (copy[w] && copy[w].text) {
                    if ((original[i].text === copy[w].text) && (original[i].status === copy[w].status)) {
                        // increase amount of times duplicate is found
                        myCount++;
                        // sets item to undefined
                        delete copy[w];
                    }
                }
            }
            if (myCount > 0) {
                const a = new Object();
                a['msg'] = original[i].text;
                a['status'] = original[i].status;
                a['created_at'] = original[i].created_at;
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
        this.sessions = this.sort.transform(this.sessions, 'created_at');
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
            this.startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
            this.endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
            this.sbs.dateObj = {
                start: this.startDate,
                end: this.endDate
            };
            localStorage.setItem('DATE_OBJ', JSON.stringify(this.sbs.dateObj));
            this.getSession();
        }
    }

    insertDates(resData) {
        const newPosArr = {};
        const startDatePart = this.startDate.split('-');
        const endDatePart = this.endDate.split('-');
        for (const currentDay = new Date(startDatePart[0], startDatePart[1] - 1, startDatePart[2]);
             currentDay <= new Date(endDatePart[0], endDatePart[1] - 1, endDatePart[2]);
             currentDay.setDate(currentDay.getDate() + 1)) {
            // let day;
            let flag = false;
            resData.forEach(x => {
                if (this.datePipe.transform(x.created_at, 'yyyy-MM-dd') === this.datePipe.transform(currentDay, 'yyyy-MM-dd')) {
                    flag = true;
                }
            });
            if (!flag) {
                newPosArr[currentDay.getTime()] = '0';
            }
        }
        Object.keys(newPosArr).forEach(function (element) {
            resData.push({
                text: '',
                created_at: new Date(parseInt(element, 10))
            });
        });
        return resData;
    }

    getGraphData(valueArr) {
        return new Promise((resolve, reject) => {
            valueArr = _.sortBy(valueArr,
                (item) => {
                    return +new Date(item.created_at);
                });
            let countArray = [];
            let dateArray = [];
            for (const i in valueArr) {
                dateArray.push(this.datePipe.transform(valueArr[i].created_at, 'MMM d'));
                if (valueArr[i].text && parseFloat(valueArr[i].text) !== 0) {
                    countArray.push(parseFloat((parseFloat(valueArr[i].text) * 100).toFixed(1)));
                } else {
                    countArray.push(null);
                }
            }

            let sum = 0;
            let count = 0;
            for (let i = 0; i < countArray.length; i++) {
                if (countArray[i] !== null) {
                    count++;
                    sum += parseInt(countArray[i], 10);
                }
            }
            this.totalAvg = parseFloat((sum / count).toFixed(2)) + '%';

            let startLabel, endLabel;
            const label = [];
            const finalCount = [];
            let weekCount = 0;
            let index = 0;
            let startIndex = valueArr[0].created_at.getDay();
            if (this.selectedValueFeedback === 'Weeks') {
                for (const i in valueArr) {
                    valueArr[i].day = valueArr[i].created_at.getDay();
                    if (valueArr[i].text === '') {
                        valueArr[i].text = '0';
                    }
                }

                for (const i in valueArr) {
                    if (startIndex === valueArr[i].day) {
                        startLabel = this.datePipe.transform(valueArr[i].created_at, 'M/d');
                        startIndex = 0;
                    }

                    if (valueArr[i].day <= 6) {
                        weekCount = weekCount + parseFloat(valueArr[i].text);
                        if (parseFloat(valueArr[i].text)) {
                            index++;
                        }
                        if (valueArr[i].day === 6 || parseInt(i, 10) === (valueArr.length - 1)) {
                            if (weekCount === 0) {
                                finalCount.push(null);
                            } else {
                                finalCount.push(parseFloat((weekCount * 100 / index).toFixed(1)));
                            }
                            weekCount = 0;
                            index = 0;
                        }
                    }
                    if (valueArr[i].day === 6 || parseInt(i, 10) === (valueArr.length - 1)) {
                        endLabel = this.datePipe.transform(valueArr[i].created_at, 'M/d');
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

            if (this.selectedValueFeedback === 'Months') {
                countArray = [];
                dateArray = [];
                const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                for (const i in valueArr) {
                    valueArr[i].month = month[valueArr[i].created_at.getMonth()] + '\'' + valueArr[i].created_at.getYear().toString().substr(-2);
                    if (valueArr[i].text === '') {
                        valueArr[i].text = 0;
                    } else {
                        valueArr[i].text = parseFloat(valueArr[i].text);
                    }
                }
                const monthData = _.groupBy(valueArr, 'month');
                const monthArray = _.map(monthData, function (monthObj) {
                    index = 0;
                    for (const i in monthObj) {
                        if (monthObj[i].text) {
                            index++;
                        }
                    }
                    const avgText = parseFloat((_.sumBy(monthObj, 'text') / index).toFixed(1));
                    return {created_at: monthObj[0].month, text: avgText * 100};
                });
                for (const i in monthArray) {
                    countArray.push(monthArray[i].text);
                    dateArray.push(monthArray[i].created_at);
                }
            }

            resolve ({countArray: countArray, dateArray: dateArray});
        });
    }

    generateGraph(finalResult) {
        return {
            chart: {
                type: 'area',
                marginTop: 50
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                categories: finalResult.dateArray,
                dateTimeLabelFormats: {
                    day: '%b %e'
                },
                labels: {
                    style: {
                        color: '#626597',
                        fontSize: '14px'
                    }
                },
                tickmarkPlacement: 'on',
                tickInterval: Math.ceil((finalResult.dateArray.length) / 60)
            },
            yAxis: {
                title: {
                    text: 'Percentage of positive feedback'
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
                },
                max: 100
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
                        enabled: true,
                        symbol: 'circle',
                        fillColor: '#6078FF',
                        radius: 7,
                        states: {
                            hover: {
                                enabled: true,
                                symbol: 'circle',
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
                                    enabled: true
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
                data: finalResult.countArray
            }]
        };
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
