import {Component, OnInit, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck} from '@angular/core';
import {ReportsService} from '../reports.service';
import {AppConfig} from '../../app.config';

@Component({
    selector: 'app-service-kpi',
    templateUrl: './service-kpi.component.html',
    styleUrls: ['./service-kpi.component.css'],
    providers: [ReportsService]
})
export class ServiceKpiComponent implements OnInit, DoCheck {
    botData: number;
    showUptimeTip = false;
    showConfidenceTip = false;
    today = new Date();
    startDate: any;
    endDate: any;
    uptime = (Math.random() * (99.92 - 99.99) + 99.99).toFixed(2);
    analytics_token: string;
    tokenDiffer: KeyValueDiffer<string, any>;

    constructor(private reportsService: ReportsService, private differs: KeyValueDiffers) {
    }

    ngOnInit() {
      this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
      this.tokenDiffer = this.differs.find(AppConfig.TOKEN).create();
      this.reportsService.registerStringBroadcast();
        this.endDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
          ('0' + (this.today.getDate() + 1)).slice(-2);
        this.today.setDate(this.today.getDate() - 30);
        this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
          ('0' + (this.today.getDate() + 1)).slice(-2);
        this.getBotTrust(this.startDate, this.endDate);
    }

  tokenChanged(changes: KeyValueChanges<string, any>) {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.uptime = (Math.random() * (99.92 - 99.99) + 99.99).toFixed(2);
    this.getBotTrust(this.startDate, this.endDate);
  }

  ngDoCheck(): void {
    const changes = this.tokenDiffer.diff(AppConfig.TOKEN);
    if (changes) {
      this.tokenChanged(changes);
    }
  }

  getBotTrust(startDate, endDate) {
    this.reportsService.getBotTrust(startDate, endDate).subscribe((response) => {
      this.botData = response.data[0].avg;
    }, (err) => {
      console.log(err);
    });
  }

}
