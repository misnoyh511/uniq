import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConversationsService} from '../../conversations/conversations.service';
import {BotService} from '../bot.service';
import {Router} from '@angular/router';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {SnackBarService} from '../../snack-bar/snack-bar.service';


@Component({
    selector: 'app-bot-configuration',
    templateUrl: 'bot-configuration.component.html',
    styleUrls: ['./bot-configuration.component.css'],
    providers: [ConversationsService, BotService]
})
export class botConfigurationComponent implements OnInit, OnDestroy {

    showNlp = false;
    showConfig = false;
    showDelete = false;
    showEditPass = false;
    dialogFlow = true;
    comingSoon1 = false;
    comingSoon2 = false;
    token: string;
    bot: any = {};
    data: any;
    botData: any = {};
    analytics_token: string;
    email = '';
    feedback = '';
    userData: any = {};

    constructor(private router: Router, private botService: BotService, public sbs: SidebarService,
                public snackBarService: SnackBarService) { }

    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('USER_INFO_KEY'));
        if (Object.keys(this.sbs.savedData).length) {
            this.botData = this.sbs.savedData;
        }
        this.sbs.botList.subscribe((data) => {
            this.botData = data[0];
        });

        this.sbs.botData.subscribe((data) => {
            this.botData = data;
        });

        this.analytics_token = this.botData.analytics_token;
    }

    ngOnDestroy() {
        this.sbs.savedData = this.botData;
    }

    editBot() {
        const bot = {
            token: this.botData.token
        };
        this.botService.editBot(bot, this.botData.id).subscribe((data) => {
            this.botData = data;
            this.snackBarService.openSnackBar('Bot Updated');
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
}
