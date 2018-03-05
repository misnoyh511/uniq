import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../../shared/sidebar/sidebar.service";

@Component({
  selector: 'app-bot-home',
  templateUrl: './bot-home.component.html',
  styleUrls: ['./bot-home.component.css'],
  providers: [SidebarService],
})
export class botHomeComponent implements OnInit {
  bot: any[];
  data: any;
  currentBot: string;
  tokenArr = {};

  constructor(private Service: SidebarService) { }

  ngOnInit() {
    this.onloaddata();
  }
  onloaddata() {
    this.Service.getBot().subscribe((data) => {
      this.bot = data;
      const tokens= {};
      this.currentBot = this.bot[0].name;
      if (this.bot.length > 0) {
        this.data = this.bot[0];
       /* data.forEach( function(item){
          const key = item['analytics_token']; // take the first key from every object in the array
          tokens[ key ] = item;  // assign the key and value to output obj
        });*/
        this.tokenArr = tokens[localStorage.getItem('ANALYTICS_TOKEN')];
       // console.log("===================", this.tokenArr);
      }
    });
  }
}
