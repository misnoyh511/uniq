import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {AppConfig} from '../app.config';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {InterceptorService} from '../interceptor/interceptor.service';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {HttpEvent} from '@angular/common/http';

@Injectable()
export class NewBotService {
  getData: any;
  constructor(private http: Http, private httpClient: InterceptorService, private localStorageService: LocalStorageService) { }

  notifyToken(x: any) {
  }

   addFaq(que) {
    const myHeaders = new Headers();
    const token = this.localStorageService.getSessionToken();
    myHeaders.append('Accept', 'application/vnd.hopin-v1+json');
    myHeaders.append('X-HopIn-Application-Id', '2XOZj58Iy6FE3wkSZDHqVlQ9TD1vm43l');
    myHeaders.append('X-HopIn-API-Key', 'Vcq9C97Gm4QE72D2HgUjtbJqjLtTkeJaCGfhGefW3Xcw' +
      'AT82xfeYrP5uhHkMyh43PWkWGGJExyetJEp43aBqBYamfENf8nskF5Vg');
    myHeaders.append('Content-Type', 'text/plain; charset=utf-8s');
    myHeaders.append('X-HopIn-Session-Token', token);
    const options = new RequestOptions({ headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/topics', que, options)
        .map(response => {
        return response.json();
        })
        .catch((err: Response) => {
          return Observable.of(err);
        });
  }

  getBot() {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});

    return this.http.get(AppConfig.API_ENDPOINT + '/ai', options)
      .map(response => {
        localStorage.setItem('ANALYTICS_TOKEN', response.json()[0].analytics_token);
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  broadcastToken(botData) {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/ai' , botData, options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        return Observable.of(err);
      });

  }

  upload(data) {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/media', data, options).map(response => {
      return response.json();
    }).catch((err: Response) => {
      const details = err;
      return Observable.throw(details);
    });
  }

  addFaqQuestion(ques) {
    const myHeaders = new Headers();
    const token = this.localStorageService.getSessionToken();
    myHeaders.append('Accept', 'application/vnd.hopin-v1+json');
    myHeaders.append('X-HopIn-Application-Id', '2XOZj58Iy6FE3wkSZDHqVlQ9TD1vm43l');
    myHeaders.append('X-HopIn-API-Key', 'Vcq9C97Gm4QE72D2HgUjtbJqjLtTkeJaCGfhGefW3Xcw' +
      'AT82xfeYrP5uhHkMyh43PWkWGGJExyetJEp43aBqBYamfENf8nskF5Vg');
    myHeaders.append('Content-Type', 'text/plain; charset=utf-8s');
    myHeaders.append('X-HopIn-Session-Token', token);
    const options = new RequestOptions({ headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/topics/' + ques.topicId + '/questions', ques , options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        return Observable.of(err);
      });
  }

  getTopicsWithQues() {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});

    return this.http.get(AppConfig.API_ENDPOINT + '/topics?include=questions', options)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  editFaq(topics, topicId) {
    const myHeaders = new Headers();
    const token = this.localStorageService.getSessionToken();
    myHeaders.append('Accept', 'application/vnd.hopin-v1+json');
    myHeaders.append('X-HopIn-Application-Id', '2XOZj58Iy6FE3wkSZDHqVlQ9TD1vm43l');
    myHeaders.append('X-HopIn-API-Key', 'Vcq9C97Gm4QE72D2HgUjtbJqjLtTkeJaCGfhGefW3Xcw' +
      'AT82xfeYrP5uhHkMyh43PWkWGGJExyetJEp43aBqBYamfENf8nskF5Vg');
    myHeaders.append('Content-Type', 'text/plain; charset=utf-8s');
    myHeaders.append('X-HopIn-Session-Token', token);
    const options = new RequestOptions({ headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/topics/' + topicId, topics, options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        return Observable.of(err);
      });
  }

  deleteFaqTopic(topicId) {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});

    return this.http.delete(AppConfig.API_ENDPOINT + '/topics/' + topicId, options)
      .map(response => {
        return response.json();
      }).catch((err: Response) => {
        return Observable.throw(err);
      });
  }

  editFaqQues(question, quesId) {
    const myHeaders = new Headers();
    const token = this.localStorageService.getSessionToken();
    myHeaders.append('Accept', 'application/vnd.hopin-v1+json');
    myHeaders.append('X-HopIn-Application-Id', '2XOZj58Iy6FE3wkSZDHqVlQ9TD1vm43l');
    myHeaders.append('X-HopIn-API-Key', 'Vcq9C97Gm4QE72D2HgUjtbJqjLtTkeJaCGfhGefW3Xcw' +
      'AT82xfeYrP5uhHkMyh43PWkWGGJExyetJEp43aBqBYamfENf8nskF5Vg');
    myHeaders.append('Content-Type', 'text/plain; charset=utf-8s');
    myHeaders.append('X-HopIn-Session-Token', token);
    const options = new RequestOptions({ headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/questions/' + quesId, question, options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        return Observable.of(err);
      });
  }
}
