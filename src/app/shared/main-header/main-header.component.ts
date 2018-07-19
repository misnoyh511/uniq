import { Component, OnInit, Input } from '@angular/core';
import {SidebarService} from "../sidebar/sidebar.service";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  @Input() addClass: any;
  constructor(private Service: SidebarService) { }

  ngOnInit() {
  }

  showNewBot() {
    console.log('Hello');
    this.addClass = !this.addClass;
  }

}
