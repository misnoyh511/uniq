import {Component, OnInit} from '@angular/core';
import {ReportsService} from '../reports.service';

@Component({
    selector: 'app-reports',
    templateUrl: 'analytics.component.html',
    styleUrls: ['./analytics.component.css'],
    providers: [ReportsService]
})
export class AnalyticsComponent implements OnInit {
    users: any = {};
    options: any = {};
    options1: any = {};
    options2 : any = {};
    constructor(private reportsService: ReportsService) {
    }

    ngOnInit() {
        this.reportsService.getTotalUsers().subscribe((response) => {
            this.users = response.data[0];
            this.options = {
                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },

                yAxis: {
                    title: {
                        text: ''
                    }
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010,
                }
                },

                series: [{
                    name: 'Current Session',
                    data: [33934, 52503, 57177, 69658, 97031, 119931, 88931, 154175]
                }, {
                    name: 'Last Session',
                    data: [43934, 40503, 67177, 55658, 87031, 132009, 119931, 124175],
                    dashStyle: 'dot'

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
            },
            this.options1 = {
                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },

                yAxis: {
                    title: {
                        text: ''
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },

                series: [{
                    name: 'Current Session',
                    data: [20000, 23000, 28000, 21000,  29000, 21000, 27000]
                }, {
                    name: 'Last Session',
                    data: [23000, 26000, 24000, 26000, 25000, 27000, 21000],
                    dashStyle: 'dot'
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

            }
            this.options2 = {
                yAxis: {
                    title: {
                        text: 'Users'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [{
                    name: 'Installation',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
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
            }
        }, (err) => {
            console.log(err);
        });
    }

}
