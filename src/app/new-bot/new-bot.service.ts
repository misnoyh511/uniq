import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {AppConfig} from "../app.config";
import {Http} from "@angular/http";
import { HttpClient,HttpHandler } from "@angular/common/http";

@Injectable()
export class NewBotService {
 // public  broadcasterToken =  new Subject<any>();
  constructor(private http: HttpClient) { }

  notifyToken(x:any){
   // this.broadcastToken.next(x)
  }
  broadcastToken(botData){
/*      console.log("===========================");*/
    return this.http.post(AppConfig.API_ENDPOINT + '/ai', botData)
}
}
