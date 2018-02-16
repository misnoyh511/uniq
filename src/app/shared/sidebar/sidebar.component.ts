import { Component, OnInit } from '@angular/core';
import {SidebarService} from "./sidebar.service";
import {ConversationsService} from "../../conversations/conversations.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService ],
})
export class SidebarComponent implements OnInit {
  bot: any[];
  name : String;
  data: any;
  topMessagesIn: any = [];
  options: any = {};
  constructor(private Service: SidebarService) { }

  ngOnInit() {
    this.onloaddata();
    if(!this.data) {
      this.data = "Bot Providencia";
    }
  }
  onloaddata() {
   this.Service.getBot().subscribe((data) => {
     this.bot = data;
     if (this.bot.length > 0) {
       this.data = this.bot[0].analytics_token;
     }
   });
  }
  dropDown(){
    /*this.conversationsService.getTopMessagesIn().subscribe((response)=> {
    this.topMessagesIn = response.data;
    console.log("845248512481520",this.topMessagesIn);
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
      }*/
    localStorage.setItem('ANALYTICS_TOKEN', this.data);

  }
}
