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
            const botData =  response.json();
            const currentBot= {};
            botData.forEach( function(item){
                const key = item['analytics_token']; // take the first key from every object in the array
                botData[ key ] = item;  // assign the key and value to output obj
            });
            localStorage.setItem('CURRENT_BOT', JSON.stringify(botData[localStorage.getItem('ANALYTICS_TOKEN')]));

            return response.json();
        }).catch((err: Response) => {
          return Observable.throw(err);
        });
  }
}
