import {Injectable} from "@angular/core";
import {SecurityContext} from "../security.context.service";
import {Observable, Observer} from "rxjs";
/**
 * Created by Viki on 11/18/2016.
 */


@Injectable()
export class JwtSecurityContext extends SecurityContext {
  /*private refreshTokenObserver: Observer<string>;
  public refreshTokenObservable: Observable<string> = Observable.create((observer: Observer<string>) => this.refreshTokenObserver = observer);
  private accessTokenObserver: Observer<string>;
  public accessTokenObservable: Observable<string> = Observable.create((observer: Observer<string>) => this.accessTokenObserver = observer);
  private isAuthenticatedObserver: Observer<boolean>;
  public isAuthenticatedObservable: Observable<boolean> = Observable.create((observer: Observer<boolean>) => this.isAuthenticatedObserver = observer);
*/
  constructor() {
    super();
    console.log("TUKA");
    /*this.accessTokenObservable.subscribe((object: any) => this.isAuthenticatedObserver.next(true));*/
  }

  get accessToken(): string {
    return localStorage.getItem("auth_token");
  }

  set accessToken(accessToken: string) {
    localStorage.setItem("auth_token", accessToken);
    /*this.accessTokenObserver.next(accessToken);*/
  }

  get refreshToken(): string {
    return localStorage.getItem("auth_refresh_token");
  }

  set refreshToken(refreshToken: string) {
    localStorage.setItem("auth_refresh_token", refreshToken);
    /*this.refreshTokenObserver.next(refreshToken);*/
  }

  clearSecurityContext() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_refresh_token");
    super.clearSecurityContext();
    //this.isAuthenticatedObserver.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("auth_token");
  }
}
