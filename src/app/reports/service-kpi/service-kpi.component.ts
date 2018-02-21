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

    constructor(private reportsService: ReportsService) {
    }

    ngOnInit() {
        this.reportsService.getBotTrust().subscribe((response) => {
            this.botData = response.data[0].avg;
        }, (err) => {
            console.log(err);
        });
    }

}
