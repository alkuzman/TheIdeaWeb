/**
 * Created by Viki on 11/18/2016.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {JwtSecurityContext} from "./jwt-security-context.service";
import {Observable} from "rxjs";
/**
 * Created by Viki on 11/18/2016.
 */

@Injectable()
export class JwtAuthorizationService {

  url: string = "api/auth/login";
  private securityContext: JwtSecurityContext;
  private me: JwtAuthorizationService = this;

  constructor(private http: Http, securityContext: JwtSecurityContext) {
    this.securityContext = securityContext;
  }

  authenticate(username: string, password: string, rememberMe: boolean): Observable<any> {
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

  private extractData(res: Response) {
    let body = res.json();
    this.securityContext.accessToken = body.token;
    this.securityContext.refreshToken = body.refreshToken;
    return body || {};
  }

  private handleError(error: Response) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.json().message) ? error.json().message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }
}
