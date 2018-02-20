import { Component, OnInit } from '@angular/core';
import {ConversationsService} from '../conversations.service';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-top-messages-out',
  templateUrl: './top-messages-out.component.html',
  styleUrls: ['./top-messages-out.component.css'],
    providers: [ConversationsService]
})
export class TopMessagesOutComponent implements OnInit {

    topMessagesOut: any = [];
    data: any = {};
    showTooltip= false;
    botId: any;
    totalCount = 0;
    colorClass = ['green-bar', 'purple-bar', 'blue-bar', 'orange-bar', 'maron-bar'];

  constructor(private conversationsService: ConversationsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe((params) => {
          this.botId = params['id'];
          this.conversationsService.getTopMessagesOut().subscribe((response) => {
              this.topMessagesOut = response.data;
              for (const i in this.topMessagesOut) {
                this.totalCount = this.totalCount + parseInt(this.topMessagesOut[i].count);
              }
          }, (err) => {
              console.log(err);
          });
      });
  }

}
