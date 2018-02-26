import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {NotificationService} from '../toastr/toastr.service';
import {AppConfig} from '../app.config';
import {Http, Response} from '@angular/http';
import {InterceptorService} from '../interceptor/interceptor.service';

@Injectable()
export class ReportsService {
    analyticsId = 'PkS4FDkQ9xlaX76nAxHWJDRX7oztEPrGWBpoTtjL';
    constructor(private http: Http, private httpClient: InterceptorService) {
    }

    getNegativeChat() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'negative_message/' + this.analyticsId +
      '?start=2017-03-01&end=2018-02-17')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getNegativeSession() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'negative_session/' + this.analyticsId +
      '?start=2018-02-06&end=2018-02-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

    getAllSession(startDate, endDate) {
        return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'total_sessions/' + this.analyticsId +
            '?start=' + startDate + '&end=' + endDate)
            .map(response => {
                return response.json();
            }).catch((err: Response) => {
                return Observable.throw(err);
            });
    }

  getPositiveChat() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'positive_message/' + this.analyticsId +
      '?start=2017-03-01&end=2017-04-17')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getPositiveSession() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'positive_session/' + this.analyticsId +
      '?start=2018-02-06&end=2018-02-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getFeedbackChat() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'feedback_chat/' + this.analyticsId +
      '?start=2017-03-01&end=2017-04-17')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getFeedbackSession() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'feedback_session/' + this.analyticsId +
      '?start=2018-02-06&end=2018-02-06')
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }


  getBotTrust() {
        return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'bot_trust/' + this.analyticsId +
            '?start=2018-02-06&end=2018-02-10')
            .map(response => {
                return response.json();
            }).catch((err: Response) => {
                return Observable.throw(err);
            });
    }

    getTotalUsers(startDate, endDate) {
        return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'total_clients/' + this.analyticsId +
            '?start=' + startDate + '&end=' + endDate)
            .map(response => {
                return response.json();
            }).catch((err: Response) => {
                return Observable.throw(err);
            });
    }

    getAvgTtime(startDate, endDate) {
      return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'average_time/' + this.analyticsId +
        '?start=' + startDate + '&end=' + endDate)
        .map(response => {
          return response.json();
        }).catch((err: Response) => {
          return Observable.throw(err);
        });
    }

  getMessagePerSession(startDate, endDate) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'msg_in/' + this.analyticsId +
      '?start=' + startDate + '&end=' + endDate)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }
}
