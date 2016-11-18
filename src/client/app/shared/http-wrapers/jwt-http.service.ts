import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Response, Request, ConnectionBackend, RequestOptions} from "@angular/http";
import {Observer, Observable} from "rxjs";
/**
 * Created by Viki on 11/17/2016.
 */


@Injectable()
export class JwtHttpService extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log("VIKI");
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log("Viki");
    let httpObservable: Observable<Response> = super.get(url, options);
    let myObservable: Observable<Response> = Observable.create(
      (observer: Observer<Response>) => this.observe(observer, httpObservable)
    );
    return myObservable;
  }

  private observe(observer: Observer<Response>, httpObservable: Observable<Response>) {
    httpObservable.subscribe((response: Response) => observer.next(response), (error: Response) => this.processError(error, observer))
  }

  private processError(error: Response, observer: Observer<Response>) {
    if (error.status == 401) {
    } else {
      observer.error(error);
    }
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, options);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(url, body, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, options);
  }
}
