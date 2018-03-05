import { Injectable } from '@angular/core';
import {Observable} from '../../../node_modules/rxjs';
import {AppConfig} from '../app.config';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {InterceptorService} from '../interceptor/interceptor.service';

@Injectable()
export class BotService {

  constructor(private http: Http, private httpClient: InterceptorService, private localStorageService: LocalStorageService) { }

  editBot(botData) {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    myHeaders.append('Content-Type', 'text/plain; charset=utf-8s');
    const options = new RequestOptions({ headers: myHeaders});
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    botData.analytics_id = '';
    for (var i = 0; i < 8; i++)
      botData.analytics_id += possible.charAt(Math.floor(Math.random() * possible.length));
    return this.http.put(AppConfig.API_ENDPOINT, botData, options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        return Observable.of(err);
      });
  }

}
