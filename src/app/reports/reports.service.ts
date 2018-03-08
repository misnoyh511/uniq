import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {NotificationService} from '../toastr/toastr.service';
import {AppConfig} from '../app.config';
import {Http, Response} from '@angular/http';
import {InterceptorService} from '../interceptor/interceptor.service';
import {Broadcaster} from '../broadcaster';

@Injectable()
export class ReportsService {
  constructor(private broadcaster: Broadcaster, private http: Http, private httpClient: InterceptorService) {
    const today = new Date();
    const endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (today.getDate())).slice(-2);
    today.setDate(today.getDate() - 30);
    const startDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (today.getDate())).slice(-2);
  }

  getNegativeChat(analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'negative_message/' + analytics_token +
      '?start=2018-02-06&end=2018-03-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getNegativeSession(analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'negative_session/' + analytics_token +
      '?start=2018-02-06&end=2018-03-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getAllSession(startDate, endDate, analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'total_sessions/' + analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getPositiveChat(analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'positive_message/' + analytics_token +
      '?start=2018-02-06&end=2018-03-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getPositiveSession(analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'positive_session/' +  analytics_token +
      '?start=2018-02-06&end=2018-03-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getFeedbackChat(analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'feedback_chat/' + analytics_token +
      '?start=2017-03-01&end=2017-04-17')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getBotTrust(startDate, endDate, analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'bot_trust/' + analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getTotalUsers(startDate, endDate, analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'total_clients/' + analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getAvgTtime(startDate, endDate, analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'average_time/' + analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getMessagePerSession(startDate, endDate, analytics_token) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'msg_in/' + analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }
}
