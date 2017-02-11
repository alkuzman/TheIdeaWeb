/**
 * Created by Viki on 11/18/2016.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {JwtSecurityContext} from "./jwt-security-context.service";
import {Observable, Scheduler} from "rxjs";
import {AuthHttp, JwtHelper} from "angular2-jwt";
import {JwtRefreshAccessTokenService} from "./jwt-refresh-access-token.service";
import {Router} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
/**
 * Created by Viki on 11/18/2016.
 */

@Injectable()
export class JwtAuthenticationService {

  url: string = "api/auth/login";
  private securityContext: JwtSecurityContext;
  private me: JwtAuthenticationService = this;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private authHttp: AuthHttp, securityContext: JwtSecurityContext, private refreshAccessTokenService: JwtRefreshAccessTokenService, private router: Router) {
    this.securityContext = securityContext;
    this.scheduleRefresh();
  }

  authenticate(username: string, password: string, rememberMe: boolean): Observable<any> {
    console.log("Login");
    var body = {
      username: username,
      password: password,
      rememberMe: rememberMe
    };
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    return this.http.post(this.url, body, {headers: headers})
      .map((res: Response) => this.extractData(res))
      .catch((error: Response) => this.handleError(error));
  }

  public authenticationObservable(): Observable<boolean> {
    return this.securityContext.authenticationObservable();
  }

  public userObservable(): Observable<User> {
    return this.securityContext.principalObservable();
  }

  private extractData(res: Response) {
    let body = res.json();
    this.securityContext.accessToken = body.token;
    this.securityContext.refreshToken = body.refreshToken;
    this.scheduleRefresh();
    return res;
  }

  private handleError(error: Response) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.json().message) ? error.json().message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }

  isAuthenticated(): boolean {
    return this.securityContext.isAuthenticated();
  }

  signOut() {
    this.securityContext.clearSecurityContext();
  }

  private scheduleRefresh() {
    // Don't schedule if user-pages is not authenticated
    if (!this.isAuthenticated())
      return;
    console.log("REFRESH SCHEDULED");

    let delay: number = 0;
    let token = this.securityContext.accessToken;
    // If access token is null just refresh token immediately.
    if (token != null) {
      let now: number = new Date().valueOf();
      let jwtExp = this.jwtHelper.decodeToken(token).exp;
      let exp = new Date(0);
      exp.setUTCSeconds(jwtExp);
      delay = exp.valueOf() - now;
    }

    let queueRefresh = Scheduler.queue;

    queueRefresh.schedule(() => {
      this.refreshAccessTokenService.getNewAccessToken().subscribe((token: string) => this.scheduleRefresh(), (error: Response) => this.refreshTokenExpired(error)); // some function that deals with refreshing the token
    }, delay);
  }

  refreshTokenExpired(response: Response) {
    this.router.navigate(["/auth/logout"]);
  }
}
