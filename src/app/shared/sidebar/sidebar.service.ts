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
    let myHeaders = new Headers();
    const token = this.localStorageService.getSessionToken();
    myHeaders.append("Accept",'application/vnd.hopin-v1+json');
    myHeaders.append('X-HopIn-Application-Id','2XOZj58Iy6FE3wkSZDHqVlQ9TD1vm43l');
    myHeaders.append('X-HopIn-API-Key','Vcq9C97Gm4QE72D2HgUjtbJqjLtTkeJaCGfhGefW3XcwAT82xfeYrP5uhHkMyh43PWkWGGJExyetJEp43aBqBYamfENf8nskF5Vg');
    myHeaders.append('X-HopIn-Session-Token',token);
    let options = new RequestOptions({ headers: myHeaders});

    return this.http.get(AppConfig.API_ENDPOINT + '/ai', options)
        .map(response => {
         localStorage.setItem('analytics_token', response.json().analytics_token);
          return response.json();
        }).catch((err: Response) => {
          return Observable.throw(err);
        });
  }
}
