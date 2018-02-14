import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (router.url.indexOf('home') > -1 || router.url.indexOf('features') > -1 || router.url.indexOf('integrations') > -1 || router.url.indexOf('pricing') > -1) {
        this.hideSideBar = false;
      }
      else {
        this.hideSideBar = true;
      }
    });
  }
  title = 'app';
  hideSideBar = true;
}

