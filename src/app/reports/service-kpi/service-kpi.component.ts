import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReportsService} from '../reports.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';

@Component({
    selector: 'app-service-kpi',
    templateUrl: './service-kpi.component.html',
    styleUrls: ['./service-kpi.component.css'],
    providers: [ReportsService]
})
export class ServiceKpiComponent implements OnInit, OnDestroy {
    botData: number;
    showUptimeTip = false;
    showConfidenceTip = false;
    today = new Date();
    startDate: any;
    endDate: any;
    uptime = (Math.random() * (99.92 - 99.99) + 99.99).toFixed(2);
    analytics_token: string;

    constructor(private reportsService: ReportsService, public sbs: SidebarService) {
    }

  ngOnInit() {
    if (this.sbs.token) {
      this.analytics_token =  this.sbs.token;
      this.initFun();
    }
    this.sbs.subject.subscribe((data) => {
      this.analytics_token = data[0].analytics_token;
      this.initFun();
    });

    this.sbs.broadC.subscribe((data) => {
      this.analytics_token = data.analytics_token;
      this.initFun();
    });
  }

  initFun() {
    this.endDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (this.today.getDate())).slice(-2);
    this.today.setDate(this.today.getDate() - 30);
    this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (this.today.getDate())).slice(-2);
    this.getBotTrust(this.startDate, this.endDate);
  }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
  }

  getBotTrust(startDate, endDate) {
    this.reportsService.getBotTrust(startDate, endDate, this.analytics_token).subscribe((response) => {
      this.botData = response.data[0].avg;
    }, (err) => {
      console.log(err);
    });
  }

}
