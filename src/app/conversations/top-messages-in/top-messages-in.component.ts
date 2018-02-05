import { Component, OnInit } from '@angular/core';
import {ConversationsService} from './../conversations.service';

@Component({
  selector: 'app-top-messages-in',
  templateUrl: './top-messages-in.component.html',
  styleUrls: ['./top-messages-in.component.css'],
  providers:[ConversationsService]
})
export class TopMessagesInComponent implements OnInit {
  topMessagesIn : any = [];
  options ={
    title : { text : 'simple chart' },
    series: [{
      data: [29.9, 71.5, 106.4, 129.2]
    }]
  };
  constructor(private conversationsService:ConversationsService) {

  }

  ngOnInit() {
    this.conversationsService.getTopMessagesIn(1).subscribe((response) => {
      //this.topMessagesIn = response;
      this.topMessagesIn = [{message:'abcd', count:'10'},{message:'abcde', count:'101'},{message:'abcdef', count:'102'},{message:'abcdefg', count:'103'}];
    }, (err) => {
      console.log(err);
    });
  }

}
