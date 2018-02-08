import { Component, OnInit } from '@angular/core';
import {SidebarService} from "./sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService ],
})
export class SidebarComponent implements OnInit {
  bot: any = {};
  name : String;
  constructor(private Service: SidebarService) { }

  ngOnInit() {
    this.onloaddata();
  }
  onloaddata() {
   this.Service.getBot().subscribe((data) => {
     this.bot = data;
   });
  }
}
