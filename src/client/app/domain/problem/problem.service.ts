/**
 * Created by AKuzmanoski on 17/10/2016.
 */
import {Injectable, Inject} from "@angular/core";
import {Logger} from "../../logger.service";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Problem} from "../model/ideas/problem";
import {AuthHttp} from "angular2-jwt";
import {ProblemListFilterProperties} from "./params/problem-list-filter.properties";
import {PropertiesToUrlSearchParams} from "../../shared/utils/properties-to-url-search-params";
import {LoadingService} from "../../core/loading/loading.service";


@Injectable()
export class ProblemService {
  private problemsUrl = "/api/problems";

  constructor(private logger: Logger, private http: Http, private authHttp: AuthHttp, private loadingService: LoadingService) {

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

  getProblems(properties: ProblemListFilterProperties): Observable<Problem[]> {
    this.loadingService.load();
    let params = PropertiesToUrlSearchParams.transform(properties);
    return this.http.get(this.problemsUrl, {search: params})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  getProblem(id: number): Observable<Problem> {
    this.loadingService.load();
    let url = this.problemsUrl + "/" + id;
    /*let params = new URLSearchParams();
     params.set('id', id.toString()); // the user-pages's search value*/
    return this.http.get(url)
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  addProblem(problem: Problem): Observable<Problem> {
    this.loadingService.load();
    let body = JSON.stringify(problem);
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log(body);
    return this.authHttp.post(this.problemsUrl, body, {headers: headers})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }
}
