import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {InterceptorService} from "../../interceptor/interceptor.service";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {AppConfig} from "../../app.config";
import {LocalStorageService} from "../../local-storage/local-storage.service";

@Injectable()
export class SidebarService {

  constructor(private http: Http, private httpClient: InterceptorService, private localStorageService: LocalStorageService) { }
    getBot() {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});

    return this.http.get(AppConfig.API_ENDPOINT + '/ai', options)
        .map(response => {
               localStorage.setItem('ANALYTICS_TOKEN', response.json()[0].analytics_token);
               localStorage.setItem('FEEDBACK_TYPE', response.json()[0].feedback_type);
            return response.json();
        }).catch((err: Response) => {
          return Observable.throw(err);
        });
  }
}
