import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable, Subscriber, Subscription} from "rxjs";
import {JwtSecurityContext} from "./jwt-security-context.service";
import {AuthHttp} from "angular2-jwt";
import {LoadingService} from "../../loading/loading.service";
/**
 * Created by Viki on 11/17/2016.
 */


@Injectable()
export class JwtHttpService {
  constructor(private context: JwtSecurityContext, private authHttp: AuthHttp, private http: Http, private loadingService: LoadingService) {
  }

  public post(url: string, body: any, options?: RequestOptionsArgs, secure?: boolean): Observable<Response> {
    this.loadingService.load();
    return this.post_mine(url, body, options, secure)
      .map((response: Response) => this.handleSuccess(response))
      .catch((error: any) => this.handleError(error));
  }

  private post_mine(url: string, body: any, options?: RequestOptionsArgs, secure?: boolean) {
    if (secure) {
      if (this.context.waitForAccessToken()) {
        return new Observable((observer: Subscriber<Response>) => {
          let subscription: Subscription = this.context.accessTokenObservable().subscribe((token: string) => {
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
      }
      else {
        return this.authHttp.post(url, body, options);
      }
    }
    return this.http.post(url, body, options);
    }

  put(url: string, body: any, options?: RequestOptionsArgs, secure?: boolean): Observable<Response> {
    this.loadingService.load();
    return this.put_mine(url, body, options, secure)
      .map((response: Response) => this.handleSuccess(response))
      .catch((error: any) => this.handleError(error));
  }

  private put_mine(url: string, body: any, options?: RequestOptionsArgs, secure?: boolean) {
    if (secure) {
      if (this.context.waitForAccessToken()) {
        return new Observable((observer: Subscriber<Response>) => {
          let subscription: Subscription = this.context.accessTokenObservable().subscribe((token: string) => {
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
      }
      else {
        return this.authHttp.put(url, body, options);
      }
    }
    return this.http.put(url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs, secure?: boolean): Observable<Response> {
    this.loadingService.load();
    return this.delete_mine(url, options, secure)
      .map((response: Response) => this.handleSuccess(response))
      .catch((error: any) => this.handleError(error));
  }

  private delete_mine(url: string, options?: RequestOptionsArgs, secure?: boolean) {
    if (secure) {
      if (this.context.waitForAccessToken()) {
        return new Observable((observer: Subscriber<Response>) => {
          let subscription: Subscription = this.context.accessTokenObservable().subscribe((token: string) => {
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
      }
      else {
        return this.authHttp.delete(url, options);
      }
    }
    return this.http.delete(url, options);
  }


  get(url: string, options?: RequestOptionsArgs, secure?: boolean): Observable<Response> {
    this.loadingService.load();

    return this.get_mine(url, options, secure)
      .map((response: Response) => this.handleSuccess(response))
      .catch((error: any) => this.handleError(error));
  }

  private get_mine(url: string, options?: RequestOptionsArgs, secure?: boolean) {
    if (secure && this.context.isAuthenticated()) {
      if (this.context.waitForAccessToken()) {
        return new Observable((observer: Subscriber<Response>) => {
          let subscription: Subscription = this.context.accessTokenObservable().subscribe((token: string) => {
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
      }
      else {
        return this.authHttp.get(url, options);
      }
    }
    return this.http.get(url, options);
    }

  handleError(error: any): Observable<any> {
    this.loadingService.loadingDone();
    return Observable.throw(error);
  }

  handleSuccess(response: Response): Response {
    this.loadingService.loadingDone();
    return response;
  }
}
