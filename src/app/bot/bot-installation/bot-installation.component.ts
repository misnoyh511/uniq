import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-bot-installation',
  templateUrl: 'bot-installation.component.html',
  styleUrls: ['./bot-installation.component.css']
})
export class botInstallationComponent implements OnInit {
    botData: any = {};
    isCopied = false;
  constructor(public sbs: SidebarService) { }

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
  }

}
