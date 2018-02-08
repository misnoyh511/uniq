import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {NotificationService} from '../toastr/toastr.service';
import {AppConfig} from '../app.config';
import {Http, Response} from '@angular/http';
import {InterceptorService} from '../interceptor/interceptor.service';

@Injectable()
export class ConversationsService {
    analyticsId = 'U4L0fRquX9gKcvylBZK2DWGKhXcNOABTmyOesUyh';
  constructor(private http: Http, private httpClient: InterceptorService) {
  }

  getTopMessagesIn() {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'top_in/' + this.analyticsId)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  getTranscripts() {
      return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'transcript/' + this.analyticsId + '?start=2018-02-06&end=2018-02-06')
          .map(response => {
              return response.json();
          }).catch((err: Response) => {
              return Observable.throw(err);
          });
  }

  getTopMessagesOut() {
      return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'top_out/' + this.analyticsId)
          .map(response => {
              return response.json();
          }).catch((err: Response) => {
              return Observable.throw(err);
          });
  }
}
