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
      if (Object.keys(this.sbs.dateObj).length) {
          this.startDate = this.sbs.dateObj.start;
          this.endDate = this.sbs.dateObj.end;
      } else {
          const today = new Date();
          this.endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
              ('0' + (today.getDate())).slice(-2);
          today.setDate(today.getDate() - 30);
          this.startDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
              ('0' + (today.getDate())).slice(-2);
      }
    if (this.sbs.token) {
      this.analytics_token =  this.sbs.token;
        this.getBotTrust(this.startDate, this.endDate);
    }
    this.sbs.botList.subscribe((data) => {
      this.analytics_token = data[0].analytics_token;
        this.getBotTrust(this.startDate, this.endDate);
    });

    this.sbs.botData.subscribe((data) => {
      this.analytics_token = data.analytics_token;
        this.getBotTrust(this.startDate, this.endDate);
    });
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

    onDateChange(event: any) {
        if (event.start && event.end) {
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);
            this.startDate = startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' +
                ('0' + (startDate.getDate())).slice(-2);
            this.endDate = endDate.getFullYear() + '-' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '-' +
                ('0' + (endDate.getDate())).slice(-2);
            this.sbs.dateObj = {
                start: this.startDate,
                end: this.endDate
            };
            this.getBotTrust(this.startDate, this.endDate);
        }
    }

}
