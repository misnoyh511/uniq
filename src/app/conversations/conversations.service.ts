import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {NotificationService} from '../toastr/toastr.service';
import {AppConfig} from '../app.config';
import {Http, Response} from '@angular/http';
import {InterceptorService} from '../interceptor/interceptor.service';

@Injectable()
export class ConversationsService {

  constructor(private http: Http, private httpClient: InterceptorService) {
  }

  getTopMessagesIn(analyticsId) {
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'top_in/' + analyticsId)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }
}
