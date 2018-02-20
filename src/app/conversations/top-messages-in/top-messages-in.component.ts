import {Component, OnInit} from '@angular/core';
import {ConversationsService} from '../conversations.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-top-messages-in',
    templateUrl: './top-messages-in.component.html',
    styleUrls: ['./top-messages-in.component.css'],
    providers: [ConversationsService]
})
export class TopMessagesInComponent implements OnInit {
    topMessagesIn: any = [];
    showTooltip = false;
    botId : any;
    totalCount = 0;
    colorClass = ['green-bar', 'purple-bar', 'blue-bar', 'orange-bar', 'maron-bar'];

    constructor(public conversationsService: ConversationsService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.botId = 0;
        if (this.botId === 0 && this.botId !== 0) {
          const analytics_token = localStorage.setItem('ANALYTICS_TOKEN', '1nPBXqkOpPfxgcCB6MD5bqr4FnA6bfikOBeSynZP');

        }
        this.route.params.subscribe((params) => {
            this.botId = params['id'];
            this.conversationsService.getTopMessagesIn().subscribe((response) => {
                this.topMessagesIn = response.data;

                for (const i in this.topMessagesIn) {
                  this.totalCount = this.totalCount + parseInt(this.topMessagesIn[i].count);
                }
            }, (err) => {
                console.log(err);
            });
        });

       
    }

}
