import {Injectable, Inject} from "@angular/core";
import {Member} from "../../model/authentication/member";
import {Observable} from "rxjs";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
import {Http, Headers, Response} from "@angular/http";
/**
 * Created by Viki on 2/16/2017.
 */


@Injectable()
export class MemberService {

  membersUrl: string = "/api/members";

  constructor(@Inject(JwtHttpService) private http: Http) {
  }

  save(member: Member): Observable<Member> {
    let body = JSON.stringify(member);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.membersUrl, body, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }
}
