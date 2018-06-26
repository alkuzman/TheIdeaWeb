import {Observable} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {RefreshTokenContext} from './token/refresh-token-context';
import {TokenValidator} from './token/token-validator';
import {BaseSecurityContext, SECURITY_CONTEXTS} from './base-security-context';

/**
 * Created by Viki on 11/18/2016.
 */

@Injectable()
export class AuthenticationService {
  url = 'api/auth/login';

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(SECURITY_CONTEXTS) private securityContexts: BaseSecurityContext[],
              private refreshTokenContext: RefreshTokenContext,
              private tokenValidator: TokenValidator) {
  }

  authenticate(username: string, password: string, rememberMe: boolean): Observable<any> {
    const body = {
      username: username,
      password: password,
      rememberMe: rememberMe
    };
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('X-Requested-With', 'XMLHttpRequest');
    return this.http.post<any>(this.url, body, {headers: headers}).pipe(tap(d => this.securityContextUpdate(d)));
  }

  public authenticationObservable(): Observable<boolean> {
    return this.refreshTokenContext.getObservable().pipe(map(token => this.tokenValidator.isValid(token)));
  }

  isAuthenticated(): boolean {
    return this.tokenValidator.isValid(this.refreshTokenContext.get());
  }

  signOut() {
    this.securityContexts.forEach(context => context.clear());
  }

  private securityContextUpdate(res: any) {
    this.securityContexts.forEach(context => context.setContext(res));
  }
}
