import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AppConfig} from '../app.config';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {InterceptorService} from '../interceptor/interceptor.service';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable()
export class NewBotService {
  constructor(private http: Http, private httpClient: InterceptorService, private localStorageService: LocalStorageService) { }

  getBot() {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});

    return this.http.get(AppConfig.API_ENDPOINT + '/ai', options)
      .map(response => {
        localStorage.setItem('ANALYTICS_TOKEN', response.json()[0].analytics_token);
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  broadcastToken(botData) {
      function makeToken() {
          let text = '';
          const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

          for (let i = 0; i < 40; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
      }
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});
      botData.analytics_token = makeToken();
    return this.http.post(AppConfig.API_ENDPOINT + '/ai' , botData, options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        return Observable.of(err.json());
      });

  }

  upload(data) {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/media', data, options)
        .map(response => {
      return response.json();
    }).catch((err: Response) => {
      const details = err;
      return Observable.throw(details);
    });
  }
}
