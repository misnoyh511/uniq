import { Injectable } from '@angular/core';
import {Observable} from '../../../node_modules/rxjs';
import {AppConfig} from '../app.config';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {InterceptorService} from '../interceptor/interceptor.service';

@Injectable()
export class BotService {

  constructor(private http: Http, private httpClient: InterceptorService, private localStorageService: LocalStorageService) { }

  getBotData(botId) {
      const myHeaders = new Headers();
      this.httpClient.createAuthorizationHeader(myHeaders);
      const options = new RequestOptions({ headers: myHeaders});
      return this.http.get(AppConfig.API_ENDPOINT + '/ai/' + botId + '/full', options)
          .map(response => {
              return response.json();
          })
          .catch((err: Response) => {
              return Observable.of(err);
          });
  }
  editBot(botData, botId) {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    myHeaders.append('Content-Type', 'text/plain; charset=utf-8s');
    const options = new RequestOptions({ headers: myHeaders});
    return this.http.put(AppConfig.API_ENDPOINT + '/ai/' + botId, botData, options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        return Observable.of(err);
      });
  }

  deleteBot(botId) {
    const myHeaders = new Headers();
    this.httpClient.createAuthorizationHeader(myHeaders);
    const options = new RequestOptions({ headers: myHeaders});
    return this.http.delete(AppConfig.API_ENDPOINT + '/ai/' + botId, options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        return Observable.of(err.json());
      });
  }

  addFaq(que) {
      const myHeaders = new Headers();
      this.httpClient.createAuthorizationHeader(myHeaders);
      /*myHeaders.append('Content-Type', 'text/plain; charset=utf-8s');*/
      const options = new RequestOptions({ headers: myHeaders});
    return this.http.post(AppConfig.API_ENDPOINT + '/topics/', que, options)
      .map(response => {
        return response.json();
      })
      .catch((err: Response) => {
        return Observable.of(err);
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

    deleteFaqQuestion(quesId) {
        const myHeaders = new Headers();
        this.httpClient.createAuthorizationHeader(myHeaders);
        const options = new RequestOptions({ headers: myHeaders});

        return this.http.delete(AppConfig.API_ENDPOINT + '/questions/' + quesId, options)
            .map(response => {
                return response.json();
            }).catch((err: Response) => {
                return Observable.throw(err);
            });
    }


}
