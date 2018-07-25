import {Observable, throwError} from 'rxjs';

import {catchError, map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {RefreshTokenContext} from './refresh-token-context';
import {TokenValidator} from './token-validator';
import {AuthenticationService} from '../authentication.service';
import {AccessTokenContext} from './access-token-context';

/**
 * This service is used for getting new access token
 * @author Klupps Team
 * @version MVP
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

  /**
   * Get new access token. If this operation is unsuccessful the user will be signed out.
   * @returns observable of string or error
   */
  public getNewAccessToken(): Observable<string> {
    // First check whether the refresh token is valid;
    const refreshToken = this.refreshTokenContext.get();
    if (!this.tokenValidator.isValid(refreshToken)) {
      this.authenticationService.signOut();
      return throwError('Invalid refresh token token');
    }
    // Ask for new access token
    return this.http.get<any>(this.url, {headers: this.getHeaders(refreshToken)}).pipe(
      map(tokenObject => tokenObject.token),
      tap(accessToken => this.storeAccessToken(accessToken)),
      catchError((response: any) => this.handleError(response)));
  }

  /**
   * Set the authorization header to the refresh token.
   * @param refreshToken which will be used as authorization header
   */
  private getHeaders(refreshToken: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('X-Authorization', 'Bearer ' + refreshToken);
    return headers;
  }

  /**
   * First checks whether the token is valid. If the token is valid it will be stored in the {@link AccessTokenContext}
   * otherwise the user will be signed out.
   * @param token new token
   */
  private storeAccessToken(token: string) {
    if (this.tokenValidator.isValid(token)) {
      this.accessTokenContext.set(token);
      return token;
    } else {
      this.authenticationService.signOut();
    }
  }

  /**
   * Sign out if access denied
   * @param error {@link HttpErrorResponse}
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.authenticationService.signOut();
    }
    return throwError(error);
  }
}
