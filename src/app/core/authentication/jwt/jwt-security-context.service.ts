import {Injectable, EventEmitter, OnInit} from "@angular/core";
import {SecurityContext} from "../security.context.service";
import {Observable, Observer, Subject} from "rxjs";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";
/**
 * Created by Viki on 11/18/2016.
 */


@Injectable()
export class JwtSecurityContext extends SecurityContext implements OnInit {
  private jwtHelper: JwtHelper = new JwtHelper();
  private accessTokenChanged: Subject<string> = new Subject<string>();
  private refreshTokenChanged: Subject<string> = new Subject<string>();
  private authenticationChanged: Subject<boolean> = new Subject<boolean>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.accessTokenChanged.next(this.accessToken);
    this.refreshTokenChanged.next(this.refreshToken);
    this.authenticationChanged.next(this.isAuthenticated());
  }

  get accessToken(): string {
    return localStorage.getItem("auth_token");
  }

  set accessToken(accessToken: string) {
    localStorage.setItem("auth_token", accessToken);
    this.accessTokenChanged.next(accessToken);
    this.authenticationChanged.next(true);
  }

  get refreshToken(): string {
    return localStorage.getItem("auth_refresh_token");
  }

  set refreshToken(refreshToken: string) {
    localStorage.setItem("auth_refresh_token", refreshToken);
    this.refreshTokenChanged.next(refreshToken);
    this.authenticationChanged.next(true);
  }

  clearSecurityContext() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_refresh_token");
    super.clearSecurityContext();
    this.refreshTokenChanged.next(null);
    this.accessTokenChanged.next(null);
    this.authenticationChanged.next(false);
  }

  accessTokenObservable(): Observable<string> {
    return this.accessTokenChanged.asObservable();
  }

  refreshTokenObservable(): Observable<string> {
    return this.refreshTokenChanged.asObservable();
  }

  authenticationObservable(): Observable<boolean> {
    return this.authenticationChanged.asObservable();
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

  public waitForAccessToken(): boolean {
    if (!this.isValid(this.accessToken) && this.isValid(this.refreshToken))
      return true;
    return false;
  }

  isAccessTokenExpired(): boolean {
    let token = this.accessToken;
    return this.isValid(token);
  }

  public isValid(token: string): boolean {
    if (token != null && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }
}
