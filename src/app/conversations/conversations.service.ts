import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {NotificationService} from '../toastr/toastr.service';
import {AppConfig} from '../app.config';
import {Http, Response, Headers} from '@angular/http';
import {InterceptorService} from '../interceptor/interceptor.service';
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable()
export class ConversationsService {
    analyticsId = 'PkS4FDkQ9xlaX76nAxHWJDRX7oztEPrGWBpoTtjL';
    analytics_token = '1nPBXqkOpPfxgcCB6MD5bqr4FnA6bfikOBeSynZP';
  constructor(private http: Http, private httpClient: InterceptorService, private localStorageService: LocalStorageService) {
  }
  getTopMessagesIn() {
      const analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
     console.log("1234567890",analytics_token);
    return this.httpClient.get(AppConfig.ANALYTICS_API_ENDPOINT + 'top_in/' + analytics_token)
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
