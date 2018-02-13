import {Component, OnInit} from '@angular/core';
import {ConversationsService} from "../conversations.service";


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

    constructor(private conversationsService: ConversationsService) {

    }

    ngOnInit() {
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
