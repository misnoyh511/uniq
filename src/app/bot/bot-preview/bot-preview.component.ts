import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bot-preview',
  templateUrl: './bot-preview.component.html',
  styleUrls: ['./bot-preview.component.css']
})
export class BotPreviewComponent implements OnInit {
    botData: any = {};
  constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
              // Defaults to 0 if no query param provided.
              console.log('params', params);
              if (params && params.id) {
                  this.callScript(params.id);
              }
          });
  }

  callScript(botId) {
      if (botId) {
          return new Promise((resolve, reject) => {
              const botScript = this._renderer2.createElement('script');
              botScript.type = 'text/javascript';
              botScript.setAttribute('data-app-id', botId);
              botScript.src = 'http://service.allegra.ai/bot-script/bot.js';
              botScript.id = 'proof-script';
              botScript.onload = resolve;
              this._renderer2.appendChild(this._document.body, botScript);
          });
      }
  }
}
