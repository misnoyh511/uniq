import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import {SidebarService} from "./shared/sidebar/sidebar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  getUrl: any;
  shrinkSideBar = false;
  constructor(private Service: SidebarService, private router: Router, public ngProgress: NgProgress) {
    router.events.subscribe((val) => {
      this.getUrl = router.url;
      if (router.url === '/home' || router.url.indexOf('bot-preview') > -1 || router.url.indexOf('features') > -1 || router.url.indexOf('integrations') > -1 ||
        router.url.indexOf('pricing') > -1 || router.url.indexOf('login') > -1 || router.url.indexOf('sign-up') > -1) {
        this.hideSideBar = false;
      } else {
        this.hideSideBar = true;
      }
    });

  }
  title = 'app';
  hideSideBar = true;

  shrinkBar() {
    this.Service.getSideBar.emit(this.shrinkSideBar);
  }

}

