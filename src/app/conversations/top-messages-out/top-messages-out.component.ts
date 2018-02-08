import { Component, OnInit } from '@angular/core';
import {ConversationsService} from '../conversations.service';

@Component({
  selector: 'app-top-messages-out',
  templateUrl: './top-messages-out.component.html',
  styleUrls: ['./top-messages-out.component.css'],
    providers: [ConversationsService]
})
export class TopMessagesOutComponent implements OnInit {

    topMessagesOut: any = [];
    data: any = {};

  constructor(private conversationsService: ConversationsService) { }

  ngOnInit() {
      this.conversationsService.getTopMessagesOut().subscribe((response) => {
          this.topMessagesOut = response.data;
          this.data = {
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
          for (const i in this.topMessagesOut) {
              this.data.xAxis.categories[i] = this.topMessagesOut[i].text;
              this.data.series[0].data[i] = parseInt(this.topMessagesOut[i].count);
          }
      }, (err) => {
          console.log(err);
      });
  }

}
