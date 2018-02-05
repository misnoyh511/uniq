import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable()
export class InterceptorService {

  constructor(private http: Http, private localStorageService: LocalStorageService) {
  }

  /**
   * Set Authorization header with the format as Bearer generated_token from  local storage
   * @param {Headers} headers
   */
  createAuthorizationHeader(headers: Headers) {
    const token = this.localStorageService.getLocalStorage('token');
    headers.append('Authorization', 'Bearer ' + token);
  }

  /**
   * Get method for get type api
   * @param url
   * @returns {Observable<Response>}
   */
  get(url) {
    const getHeaders = new Headers();
    this.createAuthorizationHeader(getHeaders);
    return this.http.get(url, {
      headers: getHeaders
    });
  }

  /**
   * Post method for post type api
   * @param url
   * @param data
   * @returns {Observable<Response>}
   */
  post(url, data) {
    const postHeaders = new Headers();
    this.createAuthorizationHeader(postHeaders);
    return this.http.post(url, data, {
      headers: postHeaders
    });
  }

  /**
   * Put method for put type api
   * @param url
   * @param data
   * @returns {Observable<Response>}
   */
  put(url, data) {
    const putHeaders = new Headers();
    this.createAuthorizationHeader(putHeaders);
    return this.http.put(url, data, {
      headers: putHeaders
    });
  }

  /**
   * delete method for delete type api
   * @param url
   * @returns {Observable<Response>}
   */
  delete(url) {
    const deleteHeaders = new Headers();
    this.createAuthorizationHeader(deleteHeaders);
    return this.http.delete(url, {
      headers: deleteHeaders
    });
  }
}
