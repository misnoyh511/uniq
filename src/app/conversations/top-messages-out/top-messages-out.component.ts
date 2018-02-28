import { Component, OnInit, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck } from '@angular/core';
import {ConversationsService} from '../conversations.service';
import {Router, ActivatedRoute} from "@angular/router";
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-top-messages-out',
  templateUrl: './top-messages-out.component.html',
  styleUrls: ['./top-messages-out.component.css'],
    providers: [ConversationsService]
})
export class TopMessagesOutComponent implements OnInit, DoCheck {

    topMessagesOut: any = [];
    data: any = {};
    showTooltip= false;
    botId: any;
    totalCount = 0;
    colorClass = ['green-bar', 'purple-bar', 'blue-bar', 'orange-bar', 'maron-bar'];
    analytics_token: string;
    tokenDiffer: KeyValueDiffer<string, any>;

  constructor(private conversationsService: ConversationsService, private router: Router, private route: ActivatedRoute,
              private differs: KeyValueDiffers) { }

  ngOnInit() {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.tokenDiffer = this.differs.find(AppConfig.TOKEN).create();
    this.conversationsService.registerStringBroadcast();
    // this.conversationsService.registerStringBroadcast();
      this.route.params.subscribe((params) => {
          this.botId = params['id'];
          this.getTopMessageOut();
      });
  }

  tokenChanged(changes: KeyValueChanges<string, any>) {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.getTopMessageOut();
  }

  ngDoCheck(): void {
    const changes = this.tokenDiffer.diff(AppConfig.TOKEN);
    if (changes) {
      this.tokenChanged(changes);
    }
  }

  getTopMessageOut() {
    this.conversationsService.getTopMessagesOut().subscribe((response) => {
      this.topMessagesOut = response.data;
      for (const i in this.topMessagesOut) {
        this.totalCount = this.totalCount + parseInt(this.topMessagesOut[i].count);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
