/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Injectable} from "@angular/core";
import {Response, Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
import {Solution} from "../model/ideas/solution";
import {AuthHttp} from "angular2-jwt";
import {LoadingService} from "../../core/loading/loading.service";

@Injectable()
export class SolutionService {
  private solutionsUrl = "/api/solutions";

  constructor(private http: Http, private authHttp: AuthHttp, private loadingService: LoadingService) {

  }

  private extractData(res: Response) {
    this.loadingService.loadingDone();
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    this.loadingService.loadingDone();
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(error);
  }

  addSolution(solution: Solution): Observable<Solution> {
    this.loadingService.load();
    let body = JSON.stringify(solution);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.authHttp.post(this.solutionsUrl, body, {headers: headers})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }
}
