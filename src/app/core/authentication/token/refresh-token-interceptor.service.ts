import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {JwtInterceptor} from '@auth0/angular-jwt';
import {Observable, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {RefreshAccessTokenService} from './refresh-access-token.service';
import {AccessTokenContext} from './access-token-context';
import {TokenValidator} from './token-validator';

@Injectable()
export class RefreshTokenInterceptorService implements HttpInterceptor {

  constructor(private refreshTokenService: RefreshAccessTokenService,
              private jwtInterceptor: JwtInterceptor,
              private accessTokenContext: AccessTokenContext,
              private tokenValidator: TokenValidator) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtInterceptor.isWhitelistedDomain(req) && !this.jwtInterceptor.isBlacklistedRoute(req)) {
      if (!this.tokenValidator.isValid(this.accessTokenContext.get())) {
        return this.refreshTokenAndResend(req, next);
      }

      return next.handle(req).pipe(
        catchError((err) => {
          const errorResponse = err as HttpErrorResponse;
          if (errorResponse.status === 401) {
            return this.refreshTokenAndResend(req, next);
          }
          return throwError(err);
        }));
    } else {
      return next.handle(req);
    }
  }

  private refreshTokenAndResend(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.refreshTokenService.getNewAccessToken().pipe(mergeMap(() => {
      return this.jwtInterceptor.intercept(req, next);
    }));
  }
}
