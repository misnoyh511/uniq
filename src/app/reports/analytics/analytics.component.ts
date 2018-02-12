import {Component, OnInit} from '@angular/core';
import {ReportsService} from '../reports.service';

@Component({
    selector: 'app-reports',
    templateUrl: 'analytics.component.html',
    styleUrls: ['./analytics.component.css'],
    providers: [ReportsService]
})
export class AnalyticsComponent implements OnInit {
    users: any = {};
    constructor(private reportsService: ReportsService) {
    }

    ngOnInit() {
        this.reportsService.getTotalUsers().subscribe((response) => {
            this.users = response.data[0];
        }, (err) => {
            console.log(err);
        });
    }

}
