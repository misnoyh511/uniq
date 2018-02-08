import {Component, OnInit} from '@angular/core';
import {ConversationsService} from '../conversations.service';

@Component({
    selector: 'app-transcripts',
    templateUrl: 'transcripts.component.html',
    styleUrls: ['./transcripts.component.css'],
    providers: [ConversationsService]
})
export class TranscriptsComponent implements OnInit {

    transcripts: any = [];
    todayDate: any = new Date();
    date: any;

    constructor(private conversationsService: ConversationsService) {
    }

    ngOnInit() {
        this.conversationsService.getTranscripts().subscribe((response) => {
            const oneDay = 24 * 60 * 60 * 1000;
            this.transcripts = response.data;
            for (const i in this.transcripts) {
                this.date = new Date(this.transcripts[i].created_at);
                this.transcripts[i].duration = Math.round(Math.abs((this.todayDate - this.date) / (oneDay)));
            }
        }, (err) => {
            console.log(err);
        });
    }

}
