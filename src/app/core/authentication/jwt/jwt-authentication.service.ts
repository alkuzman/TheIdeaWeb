import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by Viki on 11/18/2016.
 */
import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {JwtSecurityContext} from './jwt-security-context.service';
import {JwtHelper} from 'angular2-jwt';
import {JwtRefreshAccessTokenService} from './jwt-refresh-access-token.service';
import {Router} from '@angular/router';
import {User} from '../../../domain/model/authentication/user';
import {JwtHttpService} from './jwt-http.service';

/**
 * Created by Viki on 11/18/2016.
 */

@Injectable()
export class JwtAuthenticationService {

  url = 'api/auth/login';
  jwtHelper: JwtHelper = new JwtHelper();
  private securityContext: JwtSecurityContext;
  private me: JwtAuthenticationService = this;

  constructor(private http: JwtHttpService, securityContext: JwtSecurityContext,
              private refreshAccessTokenService: JwtRefreshAccessTokenService, private router: Router) {
    this.securityContext = securityContext;
    this.scheduleRefresh();
  }

  authenticate(username: string, password: string, rememberMe: boolean): Observable<any> {
    console.log('Login');
    const body = {
      username: username,
      password: password,
      rememberMe: rememberMe
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    return this.http.post(this.url, body, {headers: headers}).pipe(
      map((res: Response) => this.extractData(res)),
      catchError((error: Response) => this.handleError(error)));
  }

  public authenticationObservable(): Observable<boolean> {
    return this.securityContext.authenticationObservable();
  }

  public userObservable(): Observable<User> {
    return this.securityContext.principalObservable();
  }

  isAuthenticated(): boolean {
    return this.securityContext.isAuthenticated();
  }

  signOut() {
    this.securityContext.clearSecurityContext();
  }

  refreshTokenExpired(response: Response) {
    this.router.navigate(['/auth/logout']);
  }

  private extractData(res: Response) {
    const body = res.json();
    this.securityContext.accessToken = body.token;
    this.securityContext.refreshToken = body.refreshToken;
    this.scheduleRefresh();
    return res;
  }

  private handleError(error: Response) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.json().message) ? error.json().message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return observableThrowError(error);
  }

  private scheduleRefresh() {
    // Don't schedule if user-pages is not authenticated
    if (!this.isAuthenticated()) {
      return;
    }
    console.log('REFRESH SCHEDULED');

    let delay = 0;
    const token = this.securityContext.accessToken;
    // If access token is null just refresh token immediately.
    if (token != null) {
      const now: number = new Date().valueOf();
      const jwtExp = this.jwtHelper.decodeToken(token).exp;
      const exp = new Date(0);
      exp.setUTCSeconds(jwtExp);
      delay = exp.valueOf() - now;
    }

    Observable.of(true).delay(delay).subscribe(() => {
      this.refreshAccessTokenService.getNewAccessToken()
        .subscribe((t: string) => this.scheduleRefresh(),
          (error: Response) => this.refreshTokenExpired(error)); // some function that deals with refreshing the token
    });
  }
}
