import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {SidebarService} from '../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit, OnDestroy {
  analytics_token: string;

  constructor(private authenticationService: AuthenticationService, private router: Router, public sbs: SidebarService) { }

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

  signOut() {
    //noinspection TypeScriptUnresolvedFunction
    this.authenticationService.logout().then((data) => {
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
  }

}
