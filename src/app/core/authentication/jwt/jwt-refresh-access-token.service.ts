import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {JwtSecurityContext} from './jwt-security-context.service';

/**
 * Created by Viki on 11/18/2016.
 */

@Injectable()
export class JwtRefreshAccessTokenService {

  url = 'api/auth/token';

  constructor(private http: Http, private context: JwtSecurityContext) {
  }

  getNewAccessToken(): Observable<string> {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', 'Bearer ' + this.context.refreshToken);
    return this.http.get(this.url, {headers: headers}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((response: Response) => this.handleError(response)));
  }

  private extractData(res: Response) {
    const body = res.json();
    this.context.accessToken = body.token;
    return body.token;
  }

  private handleError(error: Response) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    if (error.status === 401) {
      this.context.clearSecurityContext();
    }
    // let errMsg = (error.json().message) ? error.json().message :
    //  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg); // log to console instead
    return observableThrowError(error);
  }
}
