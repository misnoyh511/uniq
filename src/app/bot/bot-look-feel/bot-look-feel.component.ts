import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bot-look-feel',
  templateUrl: 'bot-look-feel.component.html',
  styleUrls: ['./bot-look-feel.component.css']
})
export class botLookFeelComponent implements OnInit {
  latteralTab = true;
  showBotName = false;
  showChatName = false;
  showWelcome = false;
  showTitle = false;
  showWaiting = false;
  showAvatar = false;
  showCover = false;
  showBackClr = false;
  showFontClr = false;
  botData: any = {};
  constructor() { }

  ngOnInit() {
    this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
  }

}
