import {Component, OnDestroy, OnInit} from '@angular/core';
import {SidebarService} from '../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  analytics_token: string;

  constructor(public sbs: SidebarService) { }

  ngOnInit() {
    if (this.sbs.token) {
      this.analytics_token =  this.sbs.token;
    }
    this.sbs.subject.subscribe((data) => {
      this.analytics_token = data[0].analytics_token;
    });

    this.sbs.broadC.subscribe((data) => {
      this.analytics_token = data.analytics_token;
    });
  }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
  }

}
