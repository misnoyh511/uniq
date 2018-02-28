import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bot-configuration',
  templateUrl: 'bot-configuration.component.html',
  styleUrls: ['./bot-configuration.component.css']
})
export class botConfigurationComponent implements OnInit {

  showNlp = false;
  showConfig = false;
  showDelete = false;
  showEditPass = false;
  constructor() { }

  ngOnInit() {
  }

}
