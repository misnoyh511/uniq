import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-bot-configuration',
    templateUrl: 'bot-configuration.component.html',
    styleUrls: ['./bot-configuration.component.css'],
})
export class botConfigurationComponent implements OnInit {

    showNlp = false;
    showConfig = false;
    showDelete = false;
    showEditPass = false;
    dialogFlow = true;
    comingSoon1 = false;
    comingSoon2 = false;
    currentBot: string;
    token: string;
    bot: any = {};
    data: any;
    botData: any = {};

  constructor() { }

    ngOnInit() {
      this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
    }
}
