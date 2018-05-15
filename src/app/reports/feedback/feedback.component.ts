import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReportsService} from '../reports.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {ArraySortPipe} from '../../directives/sort.directive';
import * as _ from 'lodash';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    providers: [ReportsService, ArraySortPipe, DatePipe]
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
    options: any = {};

    constructor(private reportsService: ReportsService, public sbs: SidebarService, private sort: ArraySortPipe, private datePipe: DatePipe) {
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
            } else if (this.selectedValue === 'positive') {
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
            } else {
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
                        this.generateGraph(valueArr);
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
            } else if (this.selectedValue === 'positive') {
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
            } else {
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
                        this.generateGraph(valueArr);
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
                x.created_at = this.datePipe.transform(x.created_at, 'yyyy-MM-dd');
                const day = this.datePipe.transform(currentDay, 'yyyy-MM-dd');
                if (x.created_at === day) {
                    flag = true;
                }
            });
            if (!flag) {
                newPosArr[currentDay.getTime()] = '0';
            }
        }
        for (const j in Object.keys(newPosArr)) {
            resData.push({
                text: '',
                created_at: new Date(parseInt(Object.keys(newPosArr)[j], 10))
            });
        }
        return resData;
    }

    generateGraph(valueArr) {
        for (const i in valueArr) {
            valueArr[i].created_at = this.datePipe.transform(valueArr[i].created_at, 'yyyy-MM-dd');
        }
        const graphData = _.groupBy(valueArr, 'created_at');
        let finalData = [];
        _.map(graphData, function (data) {
            finalData.push(_.groupBy(data, 'status'));
        });
        for (const i in finalData) {
            finalData[i].created_at = finalData[i].positive[0].created_at;
            if (finalData[i] && finalData[i].positive && finalData[i].positive.length <= 1) {
                if (finalData[i].positive[0].text === '') {
                    finalData[i].positive_count = 0;
                } else {
                    finalData[i].positive_count = finalData[i].positive.length;
                }
            } else {
                finalData[i].positive_count = finalData[i].positive.length;
            }
            if (finalData[i] && finalData[i].negative && finalData[i].negative.length <= 1) {
                if (finalData[i].negative[0].text === '') {
                    finalData[i].negative_count = 0;
                } else {
                    finalData[i].negative_count = finalData[i].negative.length;
                }
            } else {
                finalData[i].negative_count = finalData[i].negative.length;
            }
            if (finalData[i].positive_count === 0 && finalData[i].negative_count === 0) {
                finalData[i].positiveAvg = 0;
            } else {
                finalData[i].positiveAvg = finalData[i].positive_count * 100 / (finalData[i].positive_count + finalData[i].negative_count);
            }
            finalData[i] = _.omit(finalData[i], ['positive', 'negative', 'positive_count', 'negative_count']);
        }
        finalData = _.sortBy(finalData,
            (item) => {
                return +new Date(item.created_at);
            });
        const countArray = [];
        for (const i in finalData) {
            countArray.push(finalData[i].positiveAvg);
        }
        const startDatePart = finalData[0].created_at.split('-');
        const startPoint = Date.UTC(startDatePart[0], startDatePart[1] - 1, startDatePart[2]);
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
                    text: 'Percentage of Positive Feedback'
                },
                max: 100
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: startPoint,
                    pointInterval: 24 * 3600 * 1000
                }
            },

            series: [{
                name: 'Positive Feedback',
                data: countArray
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 700
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
}
