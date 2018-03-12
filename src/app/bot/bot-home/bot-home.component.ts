import {Component, OnInit, OnDestroy} from '@angular/core';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-bot-home',
  templateUrl: './bot-home.component.html',
  styleUrls: ['./bot-home.component.css'],
})
export class botHomeComponent implements OnInit, OnDestroy {
  bot: any[];
  data: any;
  botData: any = {};
  analytics_token: string;
  constructor(public sbs: SidebarService) {}

  ngOnInit() {
    if (this.sbs.savedData) {
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
}
