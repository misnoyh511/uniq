import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bot-modules',
  templateUrl: 'bot-modules.component.html',
  styleUrls: ['./bot-modules.component.css']
})
export class botModulesComponent implements OnInit {
  faqSection = false;
  showDiv = false;
  proHide = true;
  constructor() { }

  ngOnInit() {
  }

}
