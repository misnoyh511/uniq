import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConversationsService} from '../conversations.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {ArraySortPipe} from '../../directives/sort.directive';
import {DatePipe} from '@angular/common';

declare var that: any;

@Component({
    selector: 'app-transcripts',
    templateUrl: 'transcripts.component.html',
    styleUrls: ['./transcripts.component.css'],
    providers: [ConversationsService, ArraySortPipe, DatePipe]
})
export class TranscriptsComponent implements OnInit, OnDestroy {
    transcripts: any = [];
    date: any;
    showDialog = false;
    showTooltip = false;
    totalMsgs = [];
    startTime: any;
    analytics_token: string;
    itemPerPage = 10;
    itemsPerPage: any = [];
    items: any = [];
    pageNo = 0;
    totalPages: number;
    botName: '';
    startDate: any;
    endDate: any;
    flag = true;

    constructor(private conversationsService: ConversationsService, public sbs: SidebarService, private sort: ArraySortPipe,
                private datePipe: DatePipe) {
    }

    ngOnInit() {
        if (Object.keys(this.sbs.dateObj).length) {
            this.startDate = this.sbs.dateObj.start;
            this.endDate = this.sbs.dateObj.end;
        } else {
            this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
            this.startDate = this.datePipe.transform(((new Date()).setDate((new Date()).getDate() - 29)), 'yyyy-MM-dd');
        }
        if (this.sbs.token) {
            this.analytics_token = this.sbs.token;
            this.getTranscripts();
        }
        if (Object.keys(this.sbs.savedData).length) {
            this.botName = this.sbs.savedData.name;
            this.analytics_token = this.sbs.savedData.analytics_token;
            this.getTranscripts();
        }
        this.sbs.botList.subscribe((data) => {
            if (localStorage.getItem('CURRENT_BOT')) {
                this.botName = JSON.parse(localStorage.getItem('CURRENT_BOT')).name;
                this.analytics_token = JSON.parse(localStorage.getItem('CURRENT_BOT')).analytics_token;
            } else {
                this.botName = data[0].name;
                this.analytics_token = data[0].analytics_token;
            }
            this.getTranscripts();
        });

        this.sbs.botData.subscribe((data) => {
            this.flag = true;
            this.analytics_token = data.analytics_token;
            this.botName = data.name;
            this.getTranscripts();
        });
    }

    ngOnDestroy() {
        this.sbs.token = this.analytics_token;
    }

    reloadData() {
        this.flag = true;
        this.getTranscripts();
    }

    getTranscripts() {
        this.transcripts = [];
        this.totalMsgs = [];
        this.items = [];
        if (this.flag) {
            this.flag = false;
            this.conversationsService.getTranscripts(this.analytics_token, this.startDate, this.endDate).subscribe((response) => {
                if (response.data && response.data.length) {
                    this.transcripts.push({
                        client: response.data[0].client,
                        session_id: response.data[0].session_id,
                        created_at: response.data[0].created_at,
                        msg_in: [],
                        msg_out: [],
                        totalMsgs: [{
                            msg: response.data[0].text,
                            created_at: response.data[0].created_at,
                            type: response.data[0].type
                        }]
                    });
                    if (response.data[0].type === 'incoming') {
                        this.transcripts[0].msg_in.push({
                            msg: response.data[0].text,
                            created_at: response.data[0].created_at
                        });
                    } else {
                        this.transcripts[0].msg_out.push({
                            msg: response.data[0].text,
                            created_at: response.data[0].created_at
                        });
                    }

                    for (let i = 1; i < response.data.length; i++) {
                        const alreadyExistsAt = this.existsAt(this.transcripts, 'session_id', response.data[i].session_id);
                        if (alreadyExistsAt !== false) {
                            if (response.data[i].type === 'incoming') {
                                this.transcripts[alreadyExistsAt].msg_in.push({
                                    msg: response.data[i].text,
                                    created_at: response.data[i].created_at
                                });
                            } else {
                                this.transcripts[alreadyExistsAt].msg_out.push({
                                    msg: response.data[i].text,
                                    created_at: response.data[i].created_at
                                });
                            }
                            this.transcripts[alreadyExistsAt].totalMsgs.push({
                                msg: response.data[i].text,
                                created_at: response.data[i].created_at,
                                type: response.data[i].type
                            });
                        } else {
                            this.transcripts.push({
                                client: response.data[i].client,
                                created_at: response.data[i].created_at,
                                session_id: response.data[i].session_id,
                                msg_in: [],
                                msg_out: [],
                                totalMsgs: [{
                                    msg: response.data[i].text,
                                    created_at: response.data[i].created_at,
                                    type: response.data[i].type
                                }]
                            });
                            if (response.data[i].type === 'incoming') {
                                this.transcripts[this.transcripts.length - 1].msg_in.push({
                                    msg: response.data[i].text,
                                    created_at: response.data[i].created_at
                                });
                            } else {
                                this.transcripts[this.transcripts.length - 1].msg_out.push({
                                    msg: response.data[i].text,
                                    created_at: response.data[i].created_at
                                });
                            }
                        }
                    }
                    this.transcripts.reverse();
                    this.itemsPerPage = this.getItemPerPage(this.transcripts.length);
                    this.totalPages = Math.ceil(this.transcripts.length / this.itemPerPage);
                    this.getPaginatedData();
                }

            }, (err) => {
                console.log(err);
            });
        }
    }

    existsAt(array, key, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return false;
    }

    openChatBox(transcript) {
        this.totalMsgs = transcript.totalMsgs;
        this.startTime = transcript.created_at;
    }

    getItemPerPage(count) {
        if (count <= 10) {
            return [];
        } else if (count <= 25) {
            return [10, 25];
        } else if (count <= 50) {
            return [10, 25, 50];
        } else {
            return [10, 25, 50, 100];
        }
    }

    goBack() {
        this.pageNo = this.pageNo - 1;
        this.getPaginatedData();
    }

    goAhead() {
        this.pageNo = this.pageNo + 1;
        this.getPaginatedData();
    }

    getItemCount() {
        this.pageNo = 0;
        this.totalPages = Math.ceil(this.transcripts.length / this.itemPerPage);
        this.getPaginatedData();
    }

    getPaginatedData() {
        this.items = [];
        this.transcripts = this.sort.transform(this.transcripts, 'created_at');
        for (let j = (this.pageNo * this.itemPerPage); j < (this.itemPerPage * (this.pageNo + 1)); j++) {
            this.items.push(this.transcripts[j]);
            if (j === this.transcripts.length - 1) {
                break;
            }
        }
    }

    moveToFirstPage() {
        this.pageNo = 0;
        this.getPaginatedData();
    }

    onDateChange(event: any) {
        if (event.start && event.end) {
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);
            this.startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
            this.endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
            this.sbs.dateObj = {
                start: this.startDate,
                end: this.endDate
            };
            this.flag = true;
            this.getTranscripts();
        }
    }
}
