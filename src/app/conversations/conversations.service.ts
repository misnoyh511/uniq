import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AppConfig} from '../app.config';
import {Http, Response, Headers} from '@angular/http';
import {InterceptorService} from '../interceptor/interceptor.service';

@Injectable()
export class ConversationsService {
  constructor(private http: Http, private httpClient: InterceptorService) {
  }

  getTopMessagesIn(analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'top_in/' + analytics_token)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getTranscripts(analytics_token) {
    const today = new Date();
    const endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (today.getDate())).slice(-2);
    today.setDate(today.getDate() - 7);
    const startDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (today.getDate())).slice(-2);
      return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'transcript/' + analytics_token + '?start=' +
        startDate + '&end=' + endDate)
          .map(response => {
              return response.json();
          }).catch((err: Response) => {
              return Observable.throw(err);
          });
  }

  getTopMessagesOut(analytics_token) {
      return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'top_out/' + analytics_token)
          .map(response => {
              return response.json();
          }).catch((err: Response) => {
              return Observable.throw(err);
          });
  }
}
