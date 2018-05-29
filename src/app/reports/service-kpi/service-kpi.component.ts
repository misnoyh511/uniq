import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReportsService} from '../reports.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-service-kpi',
    templateUrl: './service-kpi.component.html',
    styleUrls: ['./service-kpi.component.css'],
    providers: [ReportsService, DatePipe]
})
export class ServiceKpiComponent implements OnInit, OnDestroy {
    botData: number;
    showUptimeTip = false;
    showConfidenceTip = false;
    startDate: any;
    endDate: any;
    uptime = (Math.random() * (99.92 - 99.99) + 99.99).toFixed(2);
    analytics_token: string;

    constructor(private reportsService: ReportsService, public sbs: SidebarService, private datePipe: DatePipe) {
    }

  ngOnInit() {
      if (localStorage.getItem('DATE_OBJ')) {
          this.startDate = JSON.parse(localStorage.getItem('DATE_OBJ')).start;
          this.endDate = JSON.parse(localStorage.getItem('DATE_OBJ')).end;
      } else if (Object.keys(this.sbs.dateObj).length) {
          this.startDate = this.sbs.dateObj.start;
          this.endDate = this.sbs.dateObj.end;
      } else {
          this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
          this.startDate = this.datePipe.transform(((new Date()).setDate((new Date()).getDate() - 29)), 'yyyy-MM-dd');
      }
    if (this.sbs.token) {
      this.analytics_token =  this.sbs.token;
        this.getBotTrust();
    }
    this.sbs.botList.subscribe((data) => {
        if (localStorage.getItem('CURRENT_BOT')) {
            this.analytics_token = JSON.parse(localStorage.getItem('CURRENT_BOT')).analytics_token;
        } else {
            this.analytics_token = data[0].analytics_token;
        }
        this.getBotTrust();
    });

    this.sbs.botData.subscribe((data) => {
      this.analytics_token = data.analytics_token;
        this.getBotTrust();
    });
  }

  ngOnDestroy(): void {
    this.sbs.token = this.analytics_token;
  }

  getBotTrust() {
      const today = new Date();
      /*this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.startDate = this.datePipe.transform(((new Date()).setDate((new Date()).getDate() - 29)), 'yyyy-MM-dd');*/
    this.reportsService.getBotTrust(this.startDate, this.endDate, this.analytics_token).subscribe((response) => {
      this.botData = response.data[0].avg;
    }, (err) => {
      console.log(err);
    });
  }

    onDateChange(event: any) {
        if (event.start && event.end) {
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);
            this.startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
            this.endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
            this.sbs.dateObj = {
                start: this.startDate,
                end: this.endDate
            };
            localStorage.setItem('DATE_OBJ', JSON.stringify(this.sbs.dateObj));
            this.getBotTrust();
        }
    }
}
