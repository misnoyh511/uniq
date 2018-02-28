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
  analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
  feedback_type = localStorage.getItem('FEEDBACK_TYPE');
  constructor(private broadcaster: Broadcaster, private http: Http, private httpClient: InterceptorService) {

  }

  registerStringBroadcast() {
    this.broadcaster.on<string>('BotChanged')
      .subscribe(message => {
        this.feedback_type = localStorage.getItem('FEEDBACK_TYPE');
        this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
      });
  }

  getNegativeChat() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'negative_message/' + this.analytics_token +
      '?start=2018-02-06&end=2018-02-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getNegativeSession() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'negative_session/' + this.analytics_token +
      '?start=2018-02-06&end=2018-02-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getAllSession(startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'total_sessions/' + this.analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getPositiveChat() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'positive_message/' + this.analytics_token +
      '?start=2018-02-06&end=2018-02-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getPositiveSession() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'positive_session/' + this.analytics_token +
      '?start=2018-02-06&end=2018-02-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getFeedbackChat() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'feedback_chat/' + this.analytics_token +
      '?start=2017-03-01&end=2017-04-17')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getBotTrust(startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'bot_trust/' + this.analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getTotalUsers(startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'total_clients/' + this.analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getAvgTtime(startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'average_time/' + this.analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getMessagePerSession(startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'msg_in/' + this.analytics_token +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }
}
