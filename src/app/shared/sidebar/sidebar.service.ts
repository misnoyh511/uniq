import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {InterceptorService} from '../../interceptor/interceptor.service';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {AppConfig} from '../../app.config';

@Injectable()
export class SidebarService {
  public subject = new Subject<any>();
  public broadC = new Subject<any>();
  public savedData: any = {};
  public token: string;
  public feedback_type: number;

  constructor(private http: Http, private httpClient: InterceptorService) { }

  getBot() {

    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({headers: myHeaders});
    return this.http.get(AppConfig.API_ENDPOINT + '/ai', options)
      .map(response => {
        this.dataReceived(response.json());
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

    dataReceived(data) {
      this.subject.next(data);
    }

    somethingHappend(data){
     this.broadC.next(data);
    }
}
