import {Observable, throwError} from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RefreshTokenContext} from './refresh-token-context';
import {TokenValidator} from './token-validator';
import {AuthenticationService} from '../authentication.service';
import {AccessTokenContext} from './access-token-context';

/**
 * Created by Viki on 11/18/2016.
 */

@Injectable()
export class RefreshAccessTokenService {

  url = 'api/auth/token';

  constructor(private http: HttpClient,
              private refreshTokenContext: RefreshTokenContext,
              private tokenValidator: TokenValidator,
              private authenticationService: AuthenticationService,
              private accessTokenContext: AccessTokenContext) {
  }

  getNewAccessToken(): Observable<string> {
    const token = this.refreshTokenContext.get();
    if (!this.tokenValidator.isValid(token)) {
      this.authenticationService.signOut();
      return throwError('invalid token');
    }
    return this.http.get<string>(this.url, {headers: this.getHeaders(token)}).pipe(tap(newToken => this.onNewAccessToken(newToken)),
      catchError((response: any) => this.handleError(response)));
  }

  private getHeaders(token: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('X-Authorization', 'Bearer ' + token);
    return headers;
  }

  private onNewAccessToken(token: any) {
    this.accessTokenContext.set(token.token);
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    if (error.status === 401) {
      this.authenticationService.signOut();
    }
    return throwError(error);
  }
}
