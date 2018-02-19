import {Component, OnInit} from '@angular/core';
import {ConversationsService} from "../conversations.service";
import {Router, ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-top-messages-in',
    templateUrl: './top-messages-in.component.html',
    styleUrls: ['./top-messages-in.component.css'],
    providers: [ConversationsService]
})
export class TopMessagesInComponent implements OnInit {
    topMessagesIn: any = [];
    options: any = {};
    showTooltip = false;
    botId : any;

    constructor(public conversationsService: ConversationsService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.botId = 0;
        if(this.botId === 0 && this.botId !== 0)
        {
            console.log('222222',this.botId);
        const analytics_token = localStorage.setItem('ANALYTICS_TOKEN','1nPBXqkOpPfxgcCB6MD5bqr4FnA6bfikOBeSynZP');

        }
        this.route.params.subscribe((params) => {
            this.botId= params['id'];
            this.conversationsService.getTopMessagesIn().subscribe((response) => {
                this.topMessagesIn = response.data;

                this.options = {
                    chart: {
                        type: 'bar',
                        margin: 75,
                        width: 775,
                        height: 600
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: [],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Message Count',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    series: [{
                        data: []
                    }]
                };
                for (const i in this.topMessagesIn) {
                    this.options.xAxis.categories[i] = this.topMessagesIn[i].text;
                    this.options.series[0].data[i] = parseInt(this.topMessagesIn[i].count);
                }
            }, (err) => {
                console.log(err);
            });
        });

        this.conversationsService.getTopMessagesIn().subscribe((response) => {
            this.topMessagesIn = response.data;

            this.options = {
                chart: {
                    type: 'bar',
                    margin: 75,
                    width: 775,
                    height: 600
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Message Count',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                series: [{
                    data: []
                }]
            };
            for (const i in this.topMessagesIn) {
                this.options.xAxis.categories[i] = this.topMessagesIn[i].text;
                this.options.series[0].data[i] = parseInt(this.topMessagesIn[i].count);

            }
        }, (err) => {
            console.log(err);
        });
    }



}
