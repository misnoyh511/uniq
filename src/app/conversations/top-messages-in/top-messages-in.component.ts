import {Component, OnInit, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck} from '@angular/core';
import {ConversationsService} from '../conversations.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AppConfig} from '../../app.config';


@Component({
    selector: 'app-top-messages-in',
    templateUrl: './top-messages-in.component.html',
    styleUrls: ['./top-messages-in.component.css'],
    providers: [ConversationsService]
})
export class TopMessagesInComponent implements OnInit, DoCheck {
    topMessagesIn: any = [];
    showTooltip = false;
    botId: number;
    totalCount = 0;
    colorClass = ['green-bar', 'purple-bar', 'blue-bar', 'orange-bar', 'maron-bar'];
    analytics_token: string;
    tokenDiffer: KeyValueDiffer<string, any>;

    constructor(public conversationsService: ConversationsService, private router: Router, private route: ActivatedRoute,
                private differs: KeyValueDiffers) {

    }

    ngOnInit() {
      this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
      this.tokenDiffer = this.differs.find(AppConfig.TOKEN).create();
      this.conversationsService.registerStringBroadcast();
      // this.conversationsService.registerStringBroadcast();
        /*this.botId = 0;
        if (this.botId === 0 && this.botId !== 0) {
          const analytics_token = localStorage.setItem('ANALYTICS_TOKEN', '1nPBXqkOpPfxgcCB6MD5bqr4FnA6bfikOBeSynZP');

        }*/
        this.route.params.subscribe((params) => {
            this.botId = params['id'];
            this.getTopMessageIn();
        });

    }

  tokenChanged(changes: KeyValueChanges<string, any>) {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.getTopMessageIn();
  }

  ngDoCheck(): void {
    const changes = this.tokenDiffer.diff(AppConfig.TOKEN);
    if (changes) {
      this.tokenChanged(changes);
    }
  }

    getTopMessageIn() {
      this.topMessagesIn = [];
      this.conversationsService.getTopMessagesIn().subscribe((response) => {
        this.topMessagesIn = response.data;

        for (const i in this.topMessagesIn) {
          this.totalCount = this.totalCount + parseInt(this.topMessagesIn[i].count);
        }
      }, (err) => {
        console.log(err);
      });
    }

}
