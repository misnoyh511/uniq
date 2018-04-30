import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {LocalStorageService} from '../local-storage/local-storage.service';
import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class InterceptorService {

  flag = 0;

  constructor(private http: Http, private localStorageService: LocalStorageService,  public ngProgress: NgProgress) {
  }

  /**
   * Set Authorization header with the format as Bearer generated_token from  local storage
   * @param {Headers} headers
   */
  createAuthorizationHeader(headers: Headers) {
    const token = this.localStorageService.getSessionToken();
    headers.append('Accept', 'application/vnd.hopin-v1+json');
    headers.append('X-HopIn-Application-Id', '2XOZj58Iy6FE3wkSZDHqVlQ9TD1vm43l');
    headers.append('X-HopIn-API-Key', 'Vcq9C97Gm4QE72D2HgUjtbJqjLtTkeJaCGfhGefW3XcwAT82xfeYrP5uhHkMyh43PWkWGGJExyetJEp43aBqBYamfENf8nskF5Vg');
    headers.append('X-HopIn-Session-Token', token);
  }

  /**
   * Get method for get type api
   * @param url
   * @returns {Observable<Response>}
   */
  get(url) {
    const getHeaders = new Headers();
    this.createAuthorizationHeader(getHeaders);
    if (this.flag === 0) {
        this.ngProgress.start();
    }
    this.flag = this.flag + 1;
    return this.http.get(url, {
      headers: getHeaders
    }).map(getData => {
      this.flag = this.flag - 1;
        if (this.flag === 0) {
            this.ngProgress.done();
        }
        return getData;
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
    this.ngProgress.start();
    return this.http.post(url, {
      headers: postHeaders
    }).map(postData => {
      this.ngProgress.done();
      return postData;
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
    this.ngProgress.start();
    return this.http.post(url, {
      headers: putHeaders
    }).map(putData => {
      this.ngProgress.done();
      return putData;
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
    this.ngProgress.start();
    return this.http.post(url, {
      headers: deleteHeaders
    }).map(deleteData => {
      this.ngProgress.done();
      return deleteData;
    });
  }
}
