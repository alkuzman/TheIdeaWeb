import {Injectable} from "@angular/core";
import {SecurityContext} from "../security.context.service";
import {Observable, Observer} from "rxjs";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";
/**
 * Created by Viki on 11/18/2016.
 */


@Injectable()
export class JwtSecurityContext extends SecurityContext {
  private jwtHelper: JwtHelper = new JwtHelper();
  /*private refreshTokenObserver: Observer<string>;
  public refreshTokenObservable: Observable<string> = Observable.create((observer: Observer<string>) => this.refreshTokenObserver = observer);
  private accessTokenObserver: Observer<string>;
  public accessTokenObservable: Observable<string> = Observable.create((observer: Observer<string>) => this.accessTokenObserver = observer);
  private isAuthenticatedObserver: Observer<boolean>;
  public isAuthenticatedObservable: Observable<boolean> = Observable.create((observer: Observer<boolean>) => this.isAuthenticatedObserver = observer);
*/
  constructor() {
    super();
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
    console.log("Clear");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_refresh_token");
    super.clearSecurityContext();
    //this.isAuthenticatedObserver.next(false);
  }

  isAuthenticated(): boolean {
    let token = this.refreshToken;
    if(this.isValid(token)) {
      return true;
    } else {
      this.clearSecurityContext();
      return false;
    }
  }

  private isValid(token: string): boolean {
    if (token != null && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }
}
