import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {NewBotService} from './new-bot.service';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {SnackBarService} from '../snack-bar/snack-bar.service';
import {SidebarService} from '../shared/sidebar/sidebar.service';
import {BotService} from '../bot/bot.service';

@Component({
    selector: 'app-new-bot',
    templateUrl: './new-bot.component.html',
    styleUrls: ['./new-bot.component.css'],
    providers: [NewBotService, BotService],
})
export class NewBotComponent implements OnInit, OnDestroy {
    dialogRef: MatDialogRef<JazzDialogComponent>;

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

    name: string;
    chat_window_name: string;
    input_title: string;
    initial_greeting: string;
    latteralTab = true;
    floatingIcon = false;
    faqSection = false;
    faqShowHide = false;
    proActiveShowHide = false;
    liveChat = false;
    bot: any = {};
    proActive = false;
    liveChatShowHide = false;
    snackbarsOne = false;
    color: string;
    file: any[];
    avatarFile: any[];
    coverFile: any[];
    imageUrl: any;
    coverUrl: any;
    data: any;
    showDiv = false;
    showNlp = true;
    showLook = false;
    showModules = false;
    showTooltip = false;
    showBotName = false;
    showChatName = false;
    showWelcome = false;
    showTitle = false;
    showTab = false;
    showAvatar = false;
    showCover = false;
    showBackClr = false;
    showFontClr = false;
    showProject = false;
    showBusiness = false;
    showLiveChat = false;
    showOpenChat = false;
    showChatWindow = false;
    showChatBot = false;
    imagePreview: any;
    coverPreview: any;
    dialogFlow = true;
    comingSoon1 = false;
    comingSoon2 = false;
    showDesktop = false;
    showTopics = false;
    topics: any = [];
    questions: any = [];
    showTopic: any = [];
    quesArr: any = {};
    showQues: any = {};
    faqQuestion: any = [];
    errors: any = [];
    emptyField = false;
    operator = false;
    dataSaved = false;
    dwell_time = 0;
    chatBot = false;
    showDeskDwell = false;
    showMobDwell = false;

    constructor(private router: Router, private Service: NewBotService, public sbs: SidebarService, public botService: BotService,
                public dialog: MatDialog, @Inject(DOCUMENT) private doc: any, public snackBarService: SnackBarService) {
        dialog.afterOpen.subscribe(() => {
            if (!doc.body.classList.contains('no-scroll')) {
                doc.body.classList.add('no-scroll');
            }
        });
    }

    ngOnInit() {
        this.bot = {
            active: false,
            box_state: false,
            with_login: false,
            hybrid_mode: false,
            dwell_time: null,
            closed_msg: 'admin disconnected',
            mobile_complements: false,
            medium_ids: [null, null]
        };
        this.bot.tab_color = '#00FF00';
        this.bot.tab_text_color = '#00FF00';
    }

    ngOnDestroy() {
        // this.sbs.savedData = this.bot;
    }

    next() {
        if (this.latteralTab) {
            this.bot.icon_tab = false;
        }
        if (this.floatingIcon) {
            this.bot.icon_tab = true;
        }
        this.bot.icon_color = this.bot.tab_text_color;
    }

    onProActiveOutside(event) {
        if (event) {
            this.showBusiness = false;
        }
    }

    onKpiOutside(event) {
        if (event) {
            this.showChatBot = false;
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

    uploadAvatarImage() {
        const formData = new FormData();
        if (this.avatarFile) {
            for (let i = 0; i < this.avatarFile.length; i++) {
                formData.append('file', this.avatarFile[i], this.avatarFile[i].name);
            }
            formData.append('role', 'avatar');

            this.Service.upload(formData).subscribe((response) => {
                    this.bot.medium_ids[0] = response.media[0].id;
                    this.snackBarService.openSnackBar('Avatar Image Uploaded');
                },
                (error) => {
                    console.log('error', error);
                });
        }
    }

    uploadCoverImage() {
        const formData = new FormData();
        if (this.coverFile) {
            for (let i = 0; i < this.coverFile.length; i++) {
                formData.append('file', this.coverFile[i], this.coverFile[i].name);
            }
            formData.append('role', 'cover');

            this.Service.upload(formData).subscribe((response) => {
                    this.bot.medium_ids[1] = response.media[0].id;
                    this.snackBarService.openSnackBar('Cover Image Uploaded');
                },
                (error) => {
                    console.log('error', error);
                });
        }
    }

    latteralToggle() {
        this.floatingIcon = !this.latteralTab;
    }

    floatingToggle() {
        this.latteralTab = !this.floatingIcon;
    }

    faqSectionToggle() {
        if (this.faqSection) {
            this.faqShowHide = true;
        } else {
            this.faqShowHide = false;
        }
    }

    proActiveToggle() {
        if (this.proActive) {
            this.proActiveShowHide = true;
        } else {
            this.proActiveShowHide = false;
        }
    }

    liveChatToggle() {
        if (this.liveChat) {
            this.liveChatShowHide = true;
        } else {
            this.liveChatShowHide = false;
        }
    }

    checkValidation() {
        this.errors = [];
        this.emptyField = false;
        if (!this.bot.token) {
            this.errors.push({message: 'Token Missing', value: '#capture'});
        }
        if (!this.bot.operator_name || !this.bot.chat_window_name || !this.bot.initial_greeting ||
            !this.bot.input_title || this.bot.tab_name) {
            if (!this.bot.operator_name) {
                this.errors.push({
                    message: 'Bot Name is Missing', value: '#message'
                });
            }
            if (!this.bot.chat_window_name) {
                this.errors.push({
                    message: 'Chat Window Missing of Bot', value: '#message'
                });
            }
            if (!this.bot.initial_greeting) {
                this.errors.push({
                    message: 'Welcome Message is Missing', value: '#message'
                });
            }
            if (!this.bot.input_title) {
                this.errors.push({
                    message: 'Input Title is Missing', value: '#message'
                });
            }
            if (!this.bot.tab_name) {
                this.errors.push({
                    message: 'Tab Name is Missing', value: '#message'
                });
            }
        }

        if (this.errors && this.errors.length) {
            this.emptyField = true;
        } else {
            this.save();
        }
    }

    redirectPage(value) {
        if (value === '#capture') {
            this.showNlp = true;
            this.showLook = this.showModules = false;
        }
        if (value === '#message') {
            this.showLook = true;
            this.showNlp = this.showModules = false;
        }
        if (value === '#customize') {
            this.showModules = true;
            this.showLook = this.showNlp = false;
        }
    }

    save() {
        if (this.dataSaved) {
            this.editBot();
        } else {
            this.Service.broadcastToken(this.bot).subscribe((response) => {
                this.bot = response;
                this.bot.medium_ids = [null, null];
                if (this.bot.avatar_icon) {
                    this.bot.medium_ids[0] = this.bot.avatar_icon.split('/')[4];
                }
                if (this.bot.cover_image) {
                    this.bot.medium_ids[1] = this.bot.cover_image.split('/')[4];
                }
                this.sbs.savedData = response;
                localStorage.setItem('CURRENT_BOT', JSON.stringify(response));
                this.sbs.token = response.analytics_token;
                this.sbs.deleteMsg = '';
                this.sbs.getBot().subscribe((data) => {
                    this.snackBarService.openSnackBar('Bot Created');
                    this.showNlp = this.showLook = false;
                    this.showModules = true;
                    this.dataSaved = true;
                });
            }, (err) => {
                console.log(err);
            });
        }
    }

    editBot() {
        const bot = {
            chat_window_name: this.bot.chat_window_name,
            icon_tab: this.bot.icon_tab,
            initial_greeting: this.bot.initial_greeting,
            input_title: this.bot.input_title,
            tab_color: this.bot.tab_color,
            tab_text_color: this.bot.tab_text_color,
            icon_color: this.bot.tab_text_color,
            operator_name: this.bot.operator_name,
            medium_ids: this.bot.medium_ids,
            tab_name: this.bot.tab_name,
            complements_title: this.bot.complements_title,
            active: true
        };
        this.botService.editBot(bot, this.bot.id).subscribe((data) => {
            this.bot = data;
            this.sbs.savedData = this.bot;
            this.snackBarService.openSnackBar('Bot Updated');
            this.router.navigate(['/bot-home']);
        }, (err) => {
            console.log('err', err);
        });
    }

    clearSearch() {
        this.bot = {};
        this.snackbarsOne = true;
        this.showNlp = true;
        this.showModules = this.showLook = false;
        this.snackBarService.openSnackBar('Your Chat Bot has been reset');
    }

    getBotData(botId) {
        this.botService.getBotData(botId).subscribe((data) => {
            this.bot = data;
            this.topics = this.bot.topics;
            if (this.topics && this.topics.length) {
                this.faqSection = true;
            } else {
                this.faqSection = false;
            }
        }, (err) => {
            console.log(err);
        });
    }

    addFaqTopic() {
        if (this.bot.faqTopic) {
            this.botService.addFaq({topics: [{name: this.bot.faqTopic, robot_id: this.bot.id}]}).subscribe((data) => {
                this.topics.push(data.topics[0]);
                this.showTopics = true;
                this.bot.faqTopic = '';
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
            this.bot.question = this.faqQuestion[index];
            this.botService.addFaqQuestion({
                questions: [{name: this.faqQuestion[index]}],
                topicId: topicId
            }).subscribe((data) => {
                this.getBotData(this.bot.id);
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
                    this.getBotData(this.bot.id);
                    this.snackBarService.openSnackBar('Faq Topic Updated');
                }, (err) => {
                    console.log(err);
                });
            } else {
                this.snackBarService.openSnackBar('please add faq topic');
            }
        }
    }

    deleteFaqTopic(topicId, topicName) {
        if (confirm('This will delete the topic ' + topicName + '. You sure?')) {
            this.botService.deleteFaqTopic(topicId).subscribe((data) => {
                this.snackBarService.openSnackBar('Faq Topic Deleted');
                this.getBotData(this.bot.id);
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

    avatarChangeEvent(fileInput: any) {
        this.avatarFile = fileInput.target.files;
        this.imageUrl = this.avatarFile[0].name;
        this.getAvatarBase64(this.avatarFile[0]);
    }

    getAvatarBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        this.uploadAvatarImage();
    }

    coverChangeEvent(fileInput: any) {
        this.coverFile = fileInput.target.files;
        this.coverUrl = this.coverFile[0].name;
        this.getCoverBase64(this.coverFile[0]);
    }

    getCoverBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.coverPreview = reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        this.uploadCoverImage();
    }

    deleteImage(role) {
        if (role === 'avatar') {
            this.imageUrl = '';
            this.bot.medium_ids[0] = null;
        }
        if (role === 'cover') {
            this.coverUrl = '';
            this.bot.medium_ids[1] = null;
        }
    }

    onTabColor(event) {
        this.bot.tab_color = event;
    }

    onTextColor(event) {
        this.bot.tab_text_color = event;
    }

    editBotWithProActive() {
        const bot = {
            hybrid_msg: this.bot.hybrid_msg,
            hybrid_mode: this.bot.hybrid_mode,
            hybrid_desktop: this.bot.hybrid_desktop,
            hybrid_mobile: this.bot.hybrid_mobile,
            dwell_time: this.dwell_time
        };

        this.editBotData(bot, this.bot.id);
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

    changeFeedbackType() {
        const bot = {
            feedback_type: this.bot.feedback_type
        };
        this.editBotData(bot, this.bot.id);
    }
}

@Component({
    selector: 'app-jazz-dialog',
    template: `
        <div class="unlock-btn-wrap">
            <h3>Upgrade your account to the BUSINESS plan?</h3>
            <p>Your account will be prorated for the amount you have already paid during the current billing period.</p>
            <a class="blue-bg-link unlock-pro-btn" (click)="dialogRef.close('Yes!')">Yes, Upgrade Me!</a>
            <a class="hide-unlock-wrapper" data-toggle="pill" (click)="dialogRef.close('No!')">Cancel</a>
        </div>
    `
})
export class JazzDialogComponent {
    constructor(public dialogRef: MatDialogRef<JazzDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }
}





