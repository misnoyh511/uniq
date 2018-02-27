import {Component, OnInit} from '@angular/core';
import {ReportsService} from '../reports.service';

@Component({
    selector: 'app-service-kpi',
    templateUrl: './service-kpi.component.html',
    styleUrls: ['./service-kpi.component.css'],
    providers: [ReportsService]
})
export class ServiceKpiComponent implements OnInit {
    botData: number;
    showUptimeTip = false;
    showConfidenceTip = false;
    today = new Date();
    startDate: any;
    endDate: any;
    uptime = (Math.random() * (99.92 - 99.99) + 99.99).toFixed(2);

    constructor(private reportsService: ReportsService) {
    }

    ngOnInit() {
        this.endDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
          ('0' + (this.today.getDate() + 1)).slice(-2);
        this.today.setDate(this.today.getDate() - 30);
        this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
          ('0' + (this.today.getDate() + 1)).slice(-2);
        this.reportsService.getBotTrust(this.startDate, this.endDate).subscribe((response) => {
            this.botData = response.data[0].avg;
        }, (err) => {
            console.log(err);
        });
    }

}
