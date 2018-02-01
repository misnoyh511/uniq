import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-bot',
  templateUrl: './new-bot.component.html',
  styleUrls: ['./new-bot.component.css']
})
export class NewBotComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

}
