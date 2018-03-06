import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {NotificationService} from '../toastr/toastr.service';
import {AppConfig} from '../app.config';
import {Http, Response, Headers} from '@angular/http';
import {InterceptorService} from '../interceptor/interceptor.service';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Broadcaster} from '../broadcaster';

@Injectable()
export class ConversationsService {
    analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
  constructor(private broadcaster: Broadcaster, private http: Http, private httpClient: InterceptorService,
              private localStorageService: LocalStorageService) {
  }

  registerStringBroadcast() {
    this.broadcaster.on<string>('BotChanged')
      .subscribe(message => {
        this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
      });
  }

  getTopMessagesIn() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'top_in/' + this.analytics_token)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getTranscripts() {
    const today = new Date();
    const endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (today.getDate() + 1)).slice(-2);
    today.setDate(today.getDate() - 7);
    const startDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (today.getDate() + 1)).slice(-2);
      return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'transcript/' + this.analytics_token + '?start=' +
        startDate + '&end=' + endDate)
          .map(response => {
              return response.json();
          }).catch((err: Response) => {
              return Observable.throw(err);
          });
  }

  getTopMessagesOut() {
      return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'top_out/' + this.analytics_token)
          .map(response => {
              return response.json();
          }).catch((err: Response) => {
              return Observable.throw(err);
          });
  }
}
