import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-messages-in',
  templateUrl: './top-messages-in.component.html',
  styleUrls: ['./top-messages-in.component.css']
})
export class TopMessagesInComponent implements OnInit {
  options ={
    title : { text : 'simple chart' },
    series: [{
      data: [29.9, 71.5, 106.4, 129.2]
    }]
  };
  constructor() {
  }

  ngOnInit() {
  }

}
