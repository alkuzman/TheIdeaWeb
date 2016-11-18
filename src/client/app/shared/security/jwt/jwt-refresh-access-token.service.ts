import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {JwtSecurityContext} from "./jwt-security-context.service";
import {Observable} from "rxjs";
/**
 * Created by Viki on 11/18/2016.
 */

@Injectable()
export class JwtRefreshAccessTokenService {

  url: string = "auth/token";

  constructor(private http: Http, private context: JwtSecurityContext) {
  }

  getNewAccessToken(): Observable<any> {
    let headers: Headers = new Headers();
    headers.append('X-Authorization', 'Bearer ' + this.context.refreshToken);
    return this.http.get(this.url, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    this.context.accessToken = body.rawToken;
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    if (error.status == 401)
      this.context.clearSecurityContext();
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }
}
