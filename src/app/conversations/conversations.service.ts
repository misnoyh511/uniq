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
      return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'transcript/' + this.analytics_token + '?start=2018-01-01&end=2018-02-28')
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
