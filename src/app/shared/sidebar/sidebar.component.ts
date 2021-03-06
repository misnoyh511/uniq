import {Component, OnInit, Input} from '@angular/core';
import {SidebarService} from './sidebar.service';
import {Router} from '@angular/router';
import {AppConfig} from '../../app.config';
import {BotService} from '../../bot/bot.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [BotService],
})
export class SidebarComponent implements OnInit {
    @Input() navType;
    @Input() getUrl;
    bot: any[];
    name: String;
    data: any;
    id: any;
    linkUrl: any;
    message: string;
    showList = false;
    currentBot: string;
    botData: any = {};
    showMenu = false;
    sideBarShrinkLeft: any;

    constructor(private Service: SidebarService, private router: Router, private botService: BotService) {
      this.Service.getSideBar.subscribe((data) => {
        this.sideBarShrinkLeft = data;
      });
    }

    ngOnInit() {
        this.Service.botList.subscribe((data) => {
            this.bot = data;
            if (this.Service.deleteMsg) {
                this.currentBot = this.bot[0].name;
                this.Service.token = this.bot[0].analytics_token;
            } else {
                if (localStorage.getItem('CURRENT_BOT')) {
                    this.currentBot = JSON.parse(localStorage.getItem('CURRENT_BOT')).name;
                    this.Service.savedData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
                } else if (Object.keys(this.Service.savedData).length && this.Service.savedData.name) {
                    this.currentBot = this.Service.savedData.name;
                } else {
                    this.currentBot = this.bot[0].name;
                    this.Service.savedData = this.bot[0];
                }

            }
        });
        this.onloaddata();
        if (!this.data) {
            this.data = 'Bot Providencia';
        }
    }

    onloaddata() {
        this.Service.getBot().subscribe((data) => {
            if (data && data.length) {
                this.bot = data;
                if (Object.keys(this.Service.savedData).length === 0) {
                    this.Service.savedData = this.bot[0];
                }
            }
        });
    }

    dropDown(getUrl, botData) {
        if (botData) {
            localStorage.setItem('CURRENT_BOT', JSON.stringify(botData));
            this.currentBot = botData.name;
            this.Service.savedData = botData;
            this.Service.token = botData.analytics_token;
            this.Service.feedback_type = botData.feedback_type;
            if (location.pathname === '/get-started' || location.pathname === '/new-bot') {
                this.router.navigate(['/bot-home']);
                this.getBotData();
            } else {
                this.Service.somethingHappend(botData);
            }
            this.showList = false;
        }
        if (getUrl.split('/')[2]) {
            this.linkUrl = '/' + this.getUrl;
        } else {
            delete this.linkUrl;
        }
    }

    getBotData() {
        for (const i in this.bot) {
            if (this.bot[i].name === this.currentBot) {
                this.Service.token = this.bot[i].analytics_token;
                if (location.pathname === '/get-started') {
                    this.Service.somethingHappend(this.bot[i]);
                } else {
                    this.Service.savedData = this.bot[i];
                }
                break;
            }
        }
    }

    logout() {
        delete localStorage[AppConfig.USER_INFO_KEY];
        delete localStorage['CURRENT_BOT'];
        delete localStorage['DATE_OBJ'];
        this.Service.savedData = {};
        this.Service.dateObj = {};
        this.Service.token = '';
        this.Service.deleteMsg = '';
        this.router.navigate(['/login']);
    }



}
