import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bot-preview',
  templateUrl: './bot-preview.component.html',
  styleUrls: ['./bot-preview.component.css']
})
export class BotPreviewComponent implements OnInit {
    botData: any = {};
    id: any ;
    url: SafeResourceUrl;
  constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document,
              private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
              // Defaults to 0 if no query param provided.
              if (params && params.id) {
                  this.callScript(params.id);
              }
          });
  }

  callScript(botId) {
      if (botId) {
          return new Promise((resolve, reject) => {
              this.id = this.sanitizer.bypassSecurityTrustResourceUrl('http://service.allegra.ai/bot-script/bot.js');
              const botScript = this._renderer2.createElement('script');
              botScript.type = 'text/javascript';
              botScript.setAttribute('data-app-id', botId);
              botScript.src = 'http://service.allegra.ai/bot-script/bot.js';
              botScript.id = 'proof-script';
              botScript.onload = resolve;
              document.getElementsByTagName("head")[0].innerHTML = "";
              this._renderer2.appendChild(this._document.head, botScript);
          });
      }
  }
}
