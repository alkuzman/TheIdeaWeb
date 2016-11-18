import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response, Request, ConnectionBackend, RequestOptions, Headers} from "@angular/http";
import {Observer, Observable} from "rxjs";
import {JwtSecurityContext} from "./jwt-security-context.service";
import {JwtRefreshAccessTokenService} from "./jwt-refresh-access-token.service";
/**
 * Created by Viki on 11/17/2016.
 */


@Injectable()
export class JwtHttpService extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private context: JwtSecurityContext, private jwtRefreshAccessTokenService: JwtRefreshAccessTokenService) {
    super(backend, defaultOptions);
  }

  request(url: string|Request,
          options?: RequestOptionsArgs): Observable<Response> {
    if (options == null) {
      options = {};
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers = this.setHeaders(options.headers);
    let superObservable: Observable<Response> = super.request(url, options);
    let myObservable: Observable<Response> = Observable.create(
      (observer: Observer<Response>) => this.observe(observer, superObservable, url, options)
    );

    return myObservable;
  }

  setHeaders(headers: Headers): Headers {
    let authToken = this.context.accessToken;
    headers.append('X-Authorization', 'Bearer ' + authToken);
    return headers;
  }

  private observe(observer: Observer<Response>,
                  httpObservable: Observable<Response>,
                  url: string|Request,
                  options?: RequestOptionsArgs) {
    httpObservable.subscribe((response: Response) => observer.next(response),
      (error: any) => this.processError(error, observer, url, options))
  }

  private processError(error: any,
                       observer: Observer<Response>,
                       url: string|Request,
                       options?: RequestOptionsArgs) {
    console.log(error);
    if (error.status == 401) {
      if (error.message == "Token has expired") {
        this.jwtRefreshAccessTokenService
          .getNewAccessToken()
          .subscribe((token: any) => this.request(url, options), (error: any) => observer.error(error));
      }
    } else {
      observer.error(error);
    }
  }
}
