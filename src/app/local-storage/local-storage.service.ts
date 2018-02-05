import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  setLocalStorage(Key, value) {
    localStorage.setItem(Key, value);
  }

  getLocalStorage(key) {
    return localStorage[key];
  }

  getParseLocalStorage(key) {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key]);
    }
    return localStorage[key];
  }

}
