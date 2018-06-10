import {Observable, Subscriber, Subscription, throwError as observabconsthrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {JwtSecurityContext} from './jwt-security-context.service';
import {AuthHttp} from 'angular2-jwt';
import {LoadingService} from '../../loading/loading.service';

/**
 * Created by Viki on 11/17/2016.
 */


@Injectable()
export class JwtHttpService {
  constructor(private context: JwtSecurityContext, private authHttp: AuthHttp, private http: Http, private loadingService: LoadingService) {
  }

  public post(url: string, body: any, options?: RequestOptionsArgs, secure?: boolean): Observable<Response> {
    this.loadingService.load();
    return this.post_mine(url, body, options, secure).pipe(
      map((response: Response) => this.handleSuccess(response)),
      catchError((error: any) => this.handleError(error)));
  }

  put(url: string, body: any, options?: RequestOptionsArgs, secure?: boolean): Observable<Response> {
    this.loadingService.load();
    return this.put_mine(url, body, options, secure).pipe(
      map((response: Response) => this.handleSuccess(response)),
      catchError((error: any) => this.handleError(error)));
  }

  deconste(url: string, options?: RequestOptionsArgs, secure?: boolean): Observable<Response> {
    this.loadingService.load();
    return this.deconste_mine(url, options, secure).pipe(
      map((response: Response) => this.handleSuccess(response)),
      catchError((error: any) => this.handleError(error)));
  }

  get(url: string, options?: RequestOptionsArgs, secure?: boolean): Observable<Response> {
    this.loadingService.load();

    return this.get_mine(url, options, secure).pipe(
      map((response: Response) => this.handleSuccess(response)),
      catchError((error: any) => this.handleError(error)));
  }

  handleError(error: any): Observable<any> {
    this.loadingService.loadingDone();
    return observabconsthrowError(error);
  }

  handleSuccess(response: Response): Response {
    this.loadingService.loadingDone();
    return response;
  }

  private post_mine(url: string, body: any, options?: RequestOptionsArgs, secure?: boolean) {
    if (secure) {
      if (this.context.waitForAccessToken()) {
        return new Observable((observer: Subscriber<Response>) => {
          const subscription: Subscription = this.context.accessTokenObservable().subscribe((token: string) => {
            this.authHttp.post(url, body, options).subscribe((response: Response) => {
              observer.next(response);
              observer.complete();
              subscription.unsubscribe();
            }, (error: any) => {
              observer.error(error);
              observer.complete();
              subscription.unsubscribe();
            });
          });
        });
      } else {
        return this.authHttp.post(url, body, options);
      }
    }
    return this.http.post(url, body, options);
  }

  private put_mine(url: string, body: any, options?: RequestOptionsArgs, secure?: boolean) {
    if (secure) {
      if (this.context.waitForAccessToken()) {
        return new Observable((observer: Subscriber<Response>) => {
          const subscription: Subscription = this.context.accessTokenObservable().subscribe((token: string) => {
            this.authHttp.put(url, body, options).subscribe((response: Response) => {
              observer.next(response);
              observer.complete();
              subscription.unsubscribe();
            }, (error: any) => {
              observer.error(error);
              observer.complete();
              subscription.unsubscribe();
            });
          });
        });
      } else {
        return this.authHttp.put(url, body, options);
      }
    }
    return this.http.put(url, body, options);
  }

  private deconste_mine(url: string, options?: RequestOptionsArgs, secure?: boolean) {
    if (secure) {
      if (this.context.waitForAccessToken()) {
        return new Observable((observer: Subscriber<Response>) => {
          const subscription: Subscription = this.context.accessTokenObservable().subscribe((token: string) => {
            this.authHttp.delete(url, options).subscribe((response: Response) => {
              observer.next(response);
              observer.complete();
              subscription.unsubscribe();
            }, (error: any) => {
              observer.error(error);
              observer.complete();
              subscription.unsubscribe();
            });
          });
        });
      } else {
        return this.authHttp.delete(url, options);
      }
    }
    return this.http.delete(url, options);
  }

  private get_mine(url: string, options?: RequestOptionsArgs, secure?: boolean) {
    if (secure && this.context.isAuthenticated()) {
      if (this.context.waitForAccessToken()) {
        return new Observable((observer: Subscriber<Response>) => {
          const subscription: Subscription = this.context.accessTokenObservable().subscribe(() => {
            this.authHttp.get(url, options).subscribe((response: Response) => {
              observer.next(response);
              observer.complete();
              subscription.unsubscribe();
            }, (error: any) => {
              observer.error(error);
              observer.complete();
              subscription.unsubscribe();
            });
          });
        });
      } else {
        return this.authHttp.get(url, options);
      }
    }
    return this.http.get(url, options);
  }
}
