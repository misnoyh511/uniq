import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {AppConfig} from "../app.config";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import { HttpClient,HttpHandler } from "@angular/common/http";
import {InterceptorService} from "../interceptor/interceptor.service";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable()
export class NewBotService {
 // public  broadcasterToken =  new Subject<any>();
  constructor(private http: Http, private httpClient: InterceptorService, private localStorageService: LocalStorageService) { }

  notifyToken(x:any){
   // this.broadcastToken.next(x)
  }
  broadcastToken(botData){
/*      console.log("===========================");*/
    return this.http.post(AppConfig.API_ENDPOINT + '/ai', botData)
}
  addFaq(que){
    let myHeaders = new Headers();
    const token = this.localStorageService.getSessionToken();
    myHeaders.append("Accept",'application/vnd.hopin-v1+json');
    myHeaders.append('X-HopIn-Application-Id','2XOZj58Iy6FE3wkSZDHqVlQ9TD1vm43l');
    myHeaders.append('X-HopIn-API-Key','Vcq9C97Gm4QE72D2HgUjtbJqjLtTkeJaCGfhGefW3XcwAT82xfeYrP5uhHkMyh43PWkWGGJExyetJEp43aBqBYamfENf8nskF5Vg');
    myHeaders.append('Content-Type','text/plain; charset=utf-8s');
    myHeaders.append('X-HopIn-Session-Token',token);
    let options = new RequestOptions({ headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/topics',que,options)
        .map(response => {
          //console.log("response===================",response);
        return response.json();
        })
        .catch((err: Response) => {
          return Observable.of(err);
        });
  }
}