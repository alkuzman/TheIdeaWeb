import {Injectable, Inject} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Organization} from "../../model/authentication/organization";
import {Observable} from "rxjs";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
/**
 * Created by Viki on 11/25/2016.
 */

@Injectable()
export class OrganizationService {
  organizationsUrl: string = "/api/organizations"

  constructor(@Inject(JwtHttpService) private http: Http) {
  }

  addOrganization(organization: Organization): Observable<Organization> {
    let body = JSON.stringify(organization);
    console.log(organization);
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.organizationsUrl, body, {headers: headers})
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
