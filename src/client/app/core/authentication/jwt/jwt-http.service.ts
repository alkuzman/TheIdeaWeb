import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response, ConnectionBackend, RequestOptions, Headers} from "@angular/http";
import {Observer, Observable} from "rxjs";
import {JwtSecurityContext} from "./jwt-security-context.service";
import {JwtRefreshAccessTokenService} from "./jwt-refresh-access-token.service";
/**
 * Created by Viki on 11/17/2016.
 */


@Injectable()
export class JwtHttpService extends Http {
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setOptions(options);
    let superObservable: Observable<Response> = super.post(url, body, options);
    let myObservable: Observable<Response> = Observable.create(
      (observer: Observer<Response>) => this.observe(this.POST, observer, superObservable, url, null, options)
    );

    return myObservable;
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setOptions(options);
    let superObservable: Observable<Response> = super.put(url, body, options);
    let myObservable: Observable<Response> = Observable.create(
      (observer: Observer<Response>) => this.observe(this.PUT, observer, superObservable, url, null, options)
    );

    return myObservable;
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setOptions(options);
    let superObservable: Observable<Response> = super.delete(url, options);
    let myObservable: Observable<Response> = Observable.create(
      (observer: Observer<Response>) => this.observe(this.DELETE, observer, superObservable, url, null, options)
    );

    return myObservable;
  }

  private GET: number = 1;
  private POST: number = 2;
  private PUT: number = 3;
  private DELETE: number = 4;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private context: JwtSecurityContext, private jwtRefreshAccessTokenService: JwtRefreshAccessTokenService) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.setOptions(options);
    let superObservable: Observable<Response> = super.get(url, options);
    let myObservable: Observable<Response> = Observable.create(
      (observer: Observer<Response>) => this.observe(this.GET, observer, superObservable, url, null, options)
    );

    return myObservable;
  }

  setOptions(options: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = {};
    }
    options.headers = this.setHeaders(options.headers);
    return options;
  }

  setHeaders(headers: Headers): Headers {
    if (headers == null) {
      headers = new Headers();
    }
    let authToken = this.context.accessToken;
    headers.append('X-Authorization', 'Bearer ' + authToken);
    return headers;
  }

  private observe(method: number,
                  observer: Observer<Response>,
                  httpObservable: Observable<Response>,
                  url: string,
                  body: any,
                  options?: RequestOptionsArgs) {
    httpObservable.subscribe((response: Response) => observer.next(response),
      (error: Response) => this.processError(method, error, observer, url, body, options))
  }

  private processError(method: number,
                       error: Response,
                       observer: Observer<Response>,
                       url: string,
                       body: any,
                       options?: RequestOptionsArgs) {
    if (error.status == 401) {
      if (error.json().message == "Token has expired") {
        this.jwtRefreshAccessTokenService
          .getNewAccessToken()
          .subscribe((token: string) => this.resendRequest(method, url, token, observer, body, options), (error: any) => observer.error(error));
      }
    } else {
      observer.error(error);
    }
  }

  private resendRequest(method: number, url: string, token: string, observer: Observer<Response>, body: any, options?: RequestOptionsArgs,) {
    options.headers.delete("X-Authorization");
    options.headers = this.setHeaders(options.headers);
    if (method == this.GET)
      super.get(url, options).subscribe((res: Response) => observer.next(res), (error: Response) => observer.error(error));
    else if (method == this.POST)
      super.post(url, body, options);
    else if (method == this.PUT)
      super.put(url, body, options);
    else if (method = this.DELETE)
      super.delete(url, options)
  }
}
