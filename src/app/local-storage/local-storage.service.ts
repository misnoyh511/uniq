import {Injectable} from '@angular/core';
import {AppConfig} from "../app.config";

@Injectable()
export class LocalStorageService {

  setLocalStorage(Key, value) {
    localStorage.setItem(Key, value);
  }

  getLocalStorage(key) {
    return localStorage[key];
  }
  getSessionToken () {
    let userString = localStorage[AppConfig.USER_INFO_KEY];
    let session_token  = '';
    if(userString){
      let user = JSON.parse(userString);
      session_token = user.session_token;
    }
    return session_token;
  }

  getParseLocalStorage(key) {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key]);
    }
    return localStorage[key];
  }

}
