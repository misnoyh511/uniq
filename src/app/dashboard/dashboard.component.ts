import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {AppConfig} from '../app.config';
import {SidebarService} from '../shared/sidebar/sidebar.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: any;
  analytics_token: string;
  constructor(private authenticationService: AuthenticationService, private router: Router, public sbs: SidebarService) { }

  ngOnInit() {
    if (localStorage[AppConfig.USER_INFO_KEY]) {
      this.user = JSON.parse(localStorage[AppConfig.USER_INFO_KEY]);
    }
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
  logOut() {
    this.authenticationService.logout().then((data) => {
      this.router.navigate(['/']);
    });

  }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
  }

}
