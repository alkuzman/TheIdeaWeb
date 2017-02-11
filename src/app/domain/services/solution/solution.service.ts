/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Injectable} from "@angular/core";
import {Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Solution} from "../../model/ideas/solution";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";

@Injectable()
export class SolutionService {
  private solutionsUrl = "/api/solutions";

  constructor(private http: JwtHttpService) {

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }

  addSolution(solution: Solution): Observable<Solution> {
    let body = JSON.stringify(solution);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.solutionsUrl, body, {headers: headers}, true)
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }
}
