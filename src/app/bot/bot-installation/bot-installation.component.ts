import { Component, OnInit, OnDestroy } from '@angular/core';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-bot-installation',
  templateUrl: 'bot-installation.component.html',
  styleUrls: ['./bot-installation.component.css']
})
export class BotInstallationComponent implements OnInit, OnDestroy {
    botData: any = {};
    isCopied = false;
  constructor(public sbs: SidebarService) {
  }

  ngOnInit() {
      if (Object.keys(this.sbs.savedData).length) {
          this.botData = this.sbs.savedData;
      }
      this.sbs.botList.subscribe((data) => {
          if (localStorage.getItem('CURRENT_BOT')) {
              this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
          } else {
              this.botData = data[0];
          }
      });

      this.sbs.botData.subscribe((data) => {
          this.botData = data;
      });
  }
    copyToClipboard() {
        if (this.isCopied) {
            setTimeout(() => {
                this.isCopied = false;
            }, 5000);
        }
    }

    ngOnDestroy() {
        this.sbs.savedData = this.botData;
    }

}
