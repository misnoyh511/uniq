import {Component, OnInit, OnDestroy} from '@angular/core';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {BotService} from '../bot.service';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {NewBotService} from '../../new-bot/new-bot.service';
import {AppConfig} from '../../app.config';
import {Router} from '@angular/router';

@Component({
    selector: 'app-bot-home',
    templateUrl: './bot-home.component.html',
    styleUrls: ['./bot-home.component.css'],
    providers: [BotService, NewBotService]
})
export class BotHomeComponent implements OnInit, OnDestroy {
    bot: any[];
    data: any;
    botData: any = {};
    analytics_token: string;
    showDiv = false;
    previewDiv = false;
    configureDiv = false;
    lookDiv = false;
    feedbackDiv = false;
    insertDiv = false;
    reportDiv = false;
    installDiv = false;
    previewBot: string;
    showBotConfig = false;
    lookConfig = false;
    previewConfig = false;
    installConfig = false;
    knowledgeConfig = false;
    inviteConfig = false;
    reportConfig = false;
    productConfig = false;
    showDelete = false;
    showEditPass = false;
    dialogFlow = true;
    comingSoon1 = false;
    comingSoon2 = false;
    userData: any = {};
    email = '';
    feedback = '';
    floatingIcon: boolean;
    latteralTab: boolean;
    imageUrl: any;
    coverUrl: any;
    imagePreview: any;
    coverPreview: any;
    file: any[];
    avatarFile: any[];
    coverFile: any[];
    showBotName = false;
    showChatName = false;
    showWelcome = false;
    showTitle = false;
    showTab = false;
    showAvatar = false;
    showCover = false;
    showBackClr = false;
    showFontClr = false;
    isCopied = false;
    showConfig = false;

    constructor(public sbs: SidebarService, public botService: BotService, public snackBarService: SnackBarService,
                public newBotService: NewBotService, private router: Router) {
    }

    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('USER_INFO_KEY'));
        if (this.sbs.savedData) {
            this.botData = this.sbs.savedData;
            this.previewBot = AppConfig.PREVIEW_BOT + this.botData.id;
            this.getImage();
        }
        this.sbs.botList.subscribe((data) => {
            if (localStorage.getItem('CURRENT_BOT')) {
                this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
            } else {
                this.botData = data[0];
            }
            this.previewBot = AppConfig.PREVIEW_BOT + this.botData.id;
            this.getImage();
        });

        this.sbs.botData.subscribe((data) => {
            this.botData = data;
            this.previewBot = AppConfig.PREVIEW_BOT + this.botData.id;
            this.getImage();
        });
    }

    getImage() {
        this.imageUrl = '';
        this.coverUrl = '';
        this.imagePreview = '';
        this.coverPreview = '';
        this.floatingIcon = this.botData.icon_tab;
        this.latteralTab = !this.botData.icon_tab;
        if (this.botData.avatar_icon) {
            this.imageUrl = this.botData.avatar_icon;
            this.imagePreview = this.botData.avatar_icon;
        }
        if (this.botData.cover_image) {
            this.coverUrl = this.botData.cover_image;
            this.coverPreview = this.botData.cover_image;
        }
        this.botData['medium_ids'] = [null, null];
    }

    ngOnDestroy() {
        this.sbs.savedData = this.botData;
    }

    onFaqOutside(event) {
        if (event) {
            this.showDiv = false;
        }
    }

    onPreviewOutside(event) {
        if (event) {
            this.previewDiv = false;
        }
    }

    onInsertOutside(event) {
        if (event) {
            this.insertDiv = false;
        }
    }

    onLookOutside(event) {
        if (event) {
            this.lookDiv = false;
        }
    }

    onInstallOutside(event) {
        if (event) {
            this.installDiv = false;
        }
    }

    onReportOutside(event) {
        if (event) {
            this.reportDiv = false;
        }
    }

    onConfigureOutside(event) {
        if (event) {
            this.configureDiv = false;
        }
    }

    onFeedbackOutside(event) {
        if (event) {
            this.feedbackDiv = false;
        }
    }

    latteralToggle() {
        this.floatingIcon = !this.latteralTab;
    }

    floatingToggle() {
        this.latteralTab = !this.floatingIcon;
    }

    changeBotStatus() {
        const bot = {
            active: this.botData.active
        };
        this.editBot(bot);
    }

    editBotConfig() {
        const bot = {
            token: this.botData.token
        };
        this.editBot(bot);
    }

    editLookAndFeel() {
        if (this.latteralTab) {
            this.botData.icon_tab = false;
        }
        if (this.floatingIcon) {
            this.botData.icon_tab = true;
        }
        const bot = {
            chat_window_name: this.botData.chat_window_name,
            icon_tab: this.botData.icon_tab,
            initial_greeting: this.botData.initial_greeting,
            input_title: this.botData.input_title,
            tab_color: this.botData.tab_color,
            tab_text_color: this.botData.tab_text_color,
            icon_color: this.botData.tab_text_color,
            operator_name: this.botData.operator_name,
            medium_ids: this.botData.medium_ids,
            tab_name: this.botData.tab_name
        };
        this.editBot(bot);
    }

    saveAutomatedReports() {
        const bot = {
            report: this.botData.report,
            report_name: this.botData.report_name,
            report_email: this.botData.report_email
        };
        this.editBot(bot);
    }

    editBot(bot) {
        this.botService.editBot(bot, this.botData.id).subscribe((data) => {
            this.botData = data;
            this.sbs.savedData = this.botData;
            localStorage.setItem('CURRENT_BOT', JSON.stringify(this.botData));
            this.snackBarService.openSnackBar('Bot Status Updated');
        }, (err) => {
            console.log(err);
        });
    }

    deleteBot() {
        this.botService.deleteBot(this.botData.id).subscribe((response) => {
            this.sbs.deleteMsg = 'Bot Deleted';
            this.sbs.getBot().subscribe((data) => {
                if (response && response.type && response.type === 'error') {
                    this.snackBarService.openSnackBar('Error in Deleting Bot');
                } else {
                    localStorage.removeItem('CURRENT_BOT');
                    this.sbs.savedData = data[0];
                    this.snackBarService.openSnackBar('Bot Deleted');
                    this.router.navigate(['/get-started']);
                }
            }, (err) => {
                console.log(err);
            });
        }, (err) => {
            console.log(err);
        });
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

    uploadAvatarImage() {
        const formData = new FormData();
        if (this.avatarFile) {
            for (let i = 0; i < this.avatarFile.length; i++) {
                formData.append('file', this.avatarFile[i], this.avatarFile[i].name);
            }
            formData.append('role', 'avatar');

            this.newBotService.upload(formData).subscribe((response) => {
                    this.botData.medium_ids[0] = response.media[0].id;
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

            this.newBotService.upload(formData).subscribe((response) => {
                    this.botData.medium_ids[1] = response.media[0].id;
                    this.snackBarService.openSnackBar('Cover Image Uploaded');
                },
                (error) => {
                    console.log('error', error);
                });
        }
    }

    deleteImage(role) {
        if (role === 'avatar') {
            this.imageUrl = '';
        }
        if (role === 'cover') {
            this.coverUrl = '';
        }
    }

    onTabColor1(event) {
        this.botData.tab_color = event;
    }

    onTextColor1(event) {
        this.botData.tab_text_color = event;
    }

    copyToClipboard() {
        if (this.isCopied) {
            setTimeout(() => {
                this.isCopied = false;
            }, 5000);
        }
    }

}
