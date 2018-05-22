import {Component, Inject, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {DOCUMENT} from '@angular/platform-browser';
import {BotService} from '../bot.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import { DragulaService } from 'ng2-dragula';
import * as _ from 'lodash';

@Component({
    selector: 'app-bot-modules',
    templateUrl: 'bot-modules.component.html',
    styleUrls: ['./bot-modules.component.css'],
    providers: [BotService],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class botModulesComponent implements OnInit, OnDestroy {
    faqSection = false;
    showDiv = false;
    snackbarsOne = false;
    proActive: boolean;
    showBusiness = false;
    showDesktop = false;
    showDeskDwell = false;
    showMobDwell = false;
    showLiveChat = false;
    liveChat = false;
    showOpenChat = false;
    showChatWindow = false;
    showChatBot = false;
    chatBot = false;
    bot: any = {};
    dialogRef: MatDialogRef<JazzDialog>;
    analytics_token: string;
    botData: any = {};
    topics: any = [];
    showTopics = false;
    faqQuestion: any = [];
    quesArr: any = {};
    showQues: any = {};
    showTopic: any = [];
    oldTitle = '';
    dwell_time = 0;
    showPage = false;
    indexDrag: number;
    indexDrop: number;
    config: MatDialogConfig = {
        disableClose: false,
        hasBackdrop: true,
        backdropClass: '',
        width: '',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        },
        data: {
            message: 'Jazzy jazz jazz'
        }
    };

    constructor(public dialog: MatDialog, @Inject(DOCUMENT) private doc: any, public snackBarService: SnackBarService,
                public sbs: SidebarService, public botService: BotService, private dragulaService: DragulaService) {
        dialog.afterOpen.subscribe(() => {
            if (!doc.body.classList.contains('no-scroll')) {
                doc.body.classList.add('no-scroll');
            }
        });
        dragulaService.drag.subscribe((value) => {
            this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });
    }

    ngOnInit() {
        this.proActive = false;
        this.dwell_time = 0;
        if (Object.keys(this.sbs.savedData).length) {
            this.botData = this.sbs.savedData;
            this.getBotData(this.botData.id);
        }
        this.sbs.botList.subscribe((data) => {
            if (localStorage.getItem('CURRENT_BOT')) {
                this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
            } else {
                this.botData = data[0];
            }
            this.getBotData(this.botData.id);
        });

        this.sbs.botData.subscribe((data) => {
            this.botData = data;
            this.getBotData(this.botData.id);
        });
    }

    ngOnDestroy() {
        this.sbs.savedData = this.botData;
    }

    onDrag(args) {
        const [e, el] = args;
        this.indexDrag = this.getElementIndex(e);
    }

    onDrop(args) {
        const [e, el] = args;
        this.indexDrop = this.getElementIndex(e);
        this.move();
    }

    move() {
        if (this.indexDrop === this.indexDrag) {
            return this.topics;
        }

        const target = this.topics[this.indexDrag];
        const increment = this.indexDrop < this.indexDrag ? -1 : 1;
        for (let k = this.indexDrag; k !== this.indexDrop; k += increment) {
            this.topics[k] = this.topics[k + increment];
        }
        this.topics[this.indexDrop] = target;
    }

    onKpiOutside(event) {
        if (event) {
            this.showChatBot = false;
        }
    }

    onProActiveOutside(event) {
        if (event) {
            this.showBusiness = false;
        }
    }

    onFaqOutside(event) {
        if (event) {
            this.showDiv = false;
        }
    }

    onLiveChatOutside(event) {
        if (event) {
            this.showLiveChat = false;
        }
    }

    getElementIndex(el: any) {
        return [].slice.call(el.parentElement.children).indexOf(el);
    }

    clearSearch() {
        this.bot = {};
        this.snackbarsOne = true;
        this.snackBarService.openSnackBar('Your Chat Bot has been reset');
    }

    getBotData(botId) {
        this.botService.getBotData(botId).subscribe((data) => {
            this.showPage = true;
            this.botData = data;
            if (this.botData.dwell_time === null) {
                this.dwell_time = 0;
            } else {
                this.dwell_time = this.botData.dwell_time;
            }
            this.proActive = !!(this.botData.hybrid_msg || this.botData.hybrid_desktop || this.botData.hybrid_mobile
                || this.botData.hybrid_mode || this.botData.dwell_time);
            this.topics = this.botData.topics;
            this.oldTitle = _.cloneDeep(this.botData.complements_title);
            if (this.botData.complements_title || (this.topics && this.topics.length)) {
                this.faqSection = true;
            } else {
                this.faqSection = false;
            }
        }, (err) => {
            console.log(err);
        });
    }

    addFaqTopic() {
        if (this.botData.faqTopic) {
            this.botService.addFaq({topics: [{name: this.botData.faqTopic, robot_id: this.botData.id}]}).subscribe((data) => {
                this.topics.push(data.topics[0]);
                this.showTopics = true;
                this.botData.faqTopic = '';
                this.snackBarService.openSnackBar('Faq Topic Created for this Bot');
            }, (err) => {
                console.log(err);
            });
        } else {
            this.snackBarService.openSnackBar('please add faq topic');
        }
    }

    addFaqQuestion(topicId, index) {
        if (this.faqQuestion[index]) {
            this.botData.question = this.faqQuestion[index];
            this.botService.addFaqQuestion({
                questions: [{name: this.faqQuestion[index]}],
                topicId: topicId
            }).subscribe((data) => {
                this.getBotData(this.botData.id);
                this.faqQuestion[index] = '';
                this.snackBarService.openSnackBar('Faq Question Created for this Topic');
            }, (err) => {
                console.log(err);
            });
        }
    }

    getTopicsWithQues() {
        this.topics = [];
        this.botService.getTopicsWithQues().subscribe((data) => {
            this.topics = data.topics;
            if (this.topics && this.topics.length) {
                this.faqSection = true;
            }
            const questions = {};
            data.questions.forEach(function (item) {
                const key = item['id']; // take the first key from every object in the array
                questions[key] = item;  // assign the key and value to output obj
            });
            this.quesArr = questions;
        }, (err) => {
            console.log(err);
        });
    }

    editTopic(topic, index) {
        if (!this.showTopic[index]) {
            if (topic.name) {
                this.botService.editFaq({topics: [{name: topic.name}]}, topic.id).subscribe((data) => {
                    this.getBotData(this.botData.id);
                    this.snackBarService.openSnackBar('Faq Topic Updated');
                }, (err) => {
                    console.log(err);
                });
            } else {
                this.snackBarService.openSnackBar('Please Enter Topic');
            }
        }
    }

    deleteFaqTopic(topicId, topicName) {
        if (confirm('This will delete the topic ' + topicName + '. You sure?')) {
            this.botService.deleteFaqTopic(topicId).subscribe((data) => {
                this.getBotData(this.botData.id);
                this.snackBarService.openSnackBar('Faq Topic Deleted');
            }, (err) => {
                console.log(err);
            });
        }
    }

    editQues(quesName, quesId) {
        if (!this.showQues[quesId]) {
            this.botService.editFaqQues({questions: [{name: quesName}]}, quesId).subscribe((data) => {
                this.snackBarService.openSnackBar('Faq Question Updated');
            });
        }
    }

    deleteFaqQuestion(quesId) {
        if (confirm('This will delete this question. You sure?')) {
            this.botService.deleteFaqQuestion(quesId).subscribe((data) => {
                this.getBotData(this.botData.id);
                this.snackBarService.openSnackBar('Faq Question Deleted');
            }, (err) => {
                console.log(err);
            });
        }
    }

    changeTitle() {
        if (this.oldTitle !== this.botData.complements_title) {
            const bot = {
                complements_title: this.botData.complements_title
            };
            this.editBotData(bot, this.botData.id);
        }
    }

    changeFeedbackType() {
        const bot = {
            feedback_type: this.botData.feedback_type
        };
        this.editBotData(bot, this.botData.id);
    }

    editBotWithProActive() {
        const bot = {
            hybrid_msg: this.botData.hybrid_msg,
            hybrid_mode: this.botData.hybrid_mode,
            hybrid_desktop: this.botData.hybrid_desktop,
            hybrid_mobile: this.botData.hybrid_mobile,
            dwell_time: this.dwell_time
        };

        this.editBotData(bot, this.botData.id);
    }

    editBotData(botData, botId) {
        this.botService.editBot(botData, botId).subscribe((data) => {
            if (data && data.id) {
                this.sbs.feedback_type = data.feedback_type;
                this.sbs.savedData = data;
                this.snackBarService.openSnackBar('Bot Updated');
            } else {
                console.log(data);
            }
        }, (err) => {
            console.log(err);
        });
    }

}

@Component({
    selector: 'demo-jazz-dialog',
    template: `
        <div class="unlock-btn-wrap">
            <h3>Upgrade your account to the BUSINESS plan?</h3>
            <p>Your account will be prorated for the amount you have already paid during the current billing period.</p>
            <a class="blue-bg-link unlock-pro-btn" (click)="dialogRef.close('Yes!')">Yes, Upgrade Me!</a>
            <a class="hide-unlock-wrapper" data-toggle="pill" (click)="dialogRef.close('No!')">Cancel</a>
        </div>
    `
})
export class JazzDialog {
    constructor(public dialogRef: MatDialogRef<JazzDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }
}
