import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AppConfig} from '../app.config';
import {Http, Response} from '@angular/http';
import {InterceptorService} from '../interceptor/interceptor.service';

@Injectable()
export class ReportsService {
  constructor(private http: Http, private httpClient: InterceptorService) {
  }

  getNegativeChat(analytics_token, startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'negative_message/' + analytics_token +
        '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getNegativeSession(analytics_token, startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'negative_session/' + analytics_token +
        '?start=' + startDate + '&end=' + endDate)
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

  getPositiveChat(analytics_token, startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'positive_message/' + analytics_token +
        '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getPositiveSession(analytics_token, startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'positive_session/' +  analytics_token +
        '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getFeedbackChat(analytics_token, startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'feedback_chat/' + analytics_token +
        '?start=' + startDate + '&end=' + endDate)
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
