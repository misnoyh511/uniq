import {Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {DOCUMENT} from '@angular/platform-browser';
import {BotService} from '../bot.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import { DragulaService } from 'ng2-dragula';
import * as _ from 'lodash';
import {ArraySortPipe} from '../../directives/sort.directive';

@Component({
    selector: 'app-bot-modules',
    templateUrl: 'bot-modules.component.html',
    styleUrls: ['./bot-modules.component.css'],
    providers: [BotService, ArraySortPipe],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class BotModulesComponent implements OnInit, OnDestroy {
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
    quesArr: any = [];
    showTopics = false;
    faqQuestion: any = [];
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
                public sbs: SidebarService, public botService: BotService, private dragulaService: DragulaService,
                private sort: ArraySortPipe) {
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
        this.editTopic(this.topics[this.indexDrop], this.indexDrop);
        this.editTopic(this.topics[this.indexDrag], this.indexDrag);
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
                        this.oldTitle = _.cloneDeep(this.botData.complements_title);
            this.faqSection = !!(this.botData.complements_title || (this.topics && this.topics.length));

            if (this.botData.feedback_type !== null) {
                this.chatBot = true;
            }
            this.getTopicsWithQues();
        }, (err) => {
            console.log(err);
        });
    }

    addFaqTopic() {
        if (this.botData.faqTopic) {
            this.botService.addFaq({topics: [{name: this.botData.faqTopic, robot_id: this.botData.id, position: 1}]}).subscribe((data) => {
                if (this.topics && this.topics.length) {
                    for (let i = 0; i < this.topics.length; i++) {
                        this.editTopic(this.topics[i], i + 1);
                    }
                    this.topics.push(data.topics[0]);
                } else {
                    this.topics = [];
                    this.topics.push(data.topics[0]);
                }
                this.showTopics = true;
                this.botData.faqTopic = '';
                this.getTopicsWithQues();
                this.snackBarService.openSnackBar('Faq Topic Created for this Bot');
            }, (err) => {
                console.log(err);
            });
        } else {
            this.snackBarService.openSnackBar('please add faq topic');
        }
    }

    addFaqQuestion(topicId, index, questions) {
        if (this.faqQuestion[index]) {
            this.botData.question = this.faqQuestion[index];
            this.botService.addFaqQuestion({
                questions: [{name: this.faqQuestion[index], position: 1}],
                topicId: topicId
            }).subscribe((data) => {
                for (let i = 0; i < questions.length; i++) {
                    this.editQues(questions[i].name, questions[i].id, i + 1);
                }
                // this.getTopicsWithQues();
                this.faqQuestion[index] = '';
                this.snackBarService.openSnackBar('Faq Question Created for this Topic');
            }, (err) => {
                console.log(err);
            });
        }
    }

    getTopicsWithQues() {
        // this.topics = [];
        this.botService.getTopics().subscribe((data) => {
            this.topics = [];
            if (data && data.topics && data.topics.length) {
                for (const i in data.topics) {
                    data.topics[i]['questions'] = [];
                    if (data.topics[i].robot_id === this.botData.id) {
                        for (const j in data.topics[i].links.questions) {
                            this.botService.getQuestions(data.topics[i].links.questions[j]).subscribe((quesData) => {
                                data.topics[i]['questions'].push(quesData.questions[0]);
                                if (data.topics[i]['questions'] && data.topics[i]['questions'].length > 1) {
                                    data.topics[i]['questions'] = this.sort.transform(data.topics[i]['questions'], 'position');
                                    data.topics[i]['questions'] = data.topics[i]['questions'].reverse();
                                }
                            }, (err) => {
                                console.log(err);
                            });
                        }
                        this.topics.push(data.topics[i]);
                    }
                }
            }
            this.topics = this.sort.transform(this.topics, 'position');
            this.topics = this.topics.reverse();
            if (this.topics && this.topics.length) {
                this.faqSection = true;
            }
        }, (err) => {
            console.log(err);
        });
    }

    editTopic(topic, index) {
        if (!this.showTopic[index]) {
            if (topic.name) {
                this.botService.editFaq({topics: [{name: topic.name, position: index + 1}]}, topic.id).subscribe((data) => {
                    this.getTopicsWithQues();
                    this.snackBarService.openSnackBar('Faq Topic Updated');
                }, (err) => {
                    console.log(err);
                });
            } else {
                this.snackBarService.openSnackBar('Please Enter Topic');
            }
        }
    }

    deleteFaqTopic(topicId, topicName, index) {
        if (confirm('This will delete the topic "' + topicName + '". You sure?')) {
            this.botService.deleteFaqTopic(topicId).subscribe((data) => {
                if (index + 1 !== this.topics.length) {
                    for (let i = index + 1; i < this.topics.length; i++) {
                        this.editTopic(this.topics[i], (i - 1));
                    }
                } else {
                    // this.getTopicsWithQues();
                }
                this.snackBarService.openSnackBar('Faq Topic Deleted');
            }, (err) => {
                console.log(err);
            });
        }
    }

    editQues(quesName, quesId, quesIndex) {
        if (!this.showQues[quesId]) {
            this.botService.editFaqQues({questions: [{name: quesName, position: quesIndex + 1}]}, quesId).subscribe((data) => {
                this.getTopicsWithQues();
                this.snackBarService.openSnackBar('Faq Question Updated');
            });
        }
    }

    deleteFaqQuestion(quesId, questions, quesIndex) {
        if (confirm('This will delete this question. You sure?')) {
            this.botService.deleteFaqQuestion(quesId).subscribe((data) => {
                if (quesIndex + 1 !== questions.length) {
                    for (let i = quesIndex + 1; i < questions.length; i++) {
                        this.editQues(questions[i].name, questions[i].id, (i - 1));
                    }
                } else {
                    this.getTopicsWithQues();
                }
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
                localStorage.setItem('CURRENT_BOT', JSON.stringify(data));
                this.snackBarService.openSnackBar('Bot Updated');
            } else {
                console.log(data);
            }
        }, (err) => {
            console.log(err);
        });
    }

    moveUpwards(quesData, quesIndex) {
        this.editQues(quesData[quesIndex - 1].name, quesData[quesIndex - 1].id, quesIndex);
        this.editQues(quesData[quesIndex].name, quesData[quesIndex].id, quesIndex - 1);
    }

    moveDownwards(quesData, quesIndex) {
        this.editQues(quesData[quesIndex + 1].name, quesData[quesIndex + 1].id, quesIndex);
        this.editQues(quesData[quesIndex].name, quesData[quesIndex].id, quesIndex + 1);
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
