/**
 * Created by AKuzmanoski on 17/10/2016.
 */
import {Injectable, Inject} from "@angular/core";
import {Logger} from "../../logger.service";
import {Idea} from "../model/ideas/idea";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Problem} from "../model/ideas/problem";
import {JwtHttpService} from "../../core/authentication/jwt/jwt-http.service";
import {AuthHttp} from "angular2-jwt";


@Injectable()
export class ProblemService {
  private ideasUrl = "/api/problems";

  constructor(private logger: Logger, private http: Http, @Inject(JwtHttpService) private jwtHttp: Http, private authHttp: AuthHttp) {

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

  getProblems(): Observable<Problem[]> {
    return this.http.get(this.ideasUrl).map(this.extractData).catch(this.handleError);
  }

  getProblem(id: number): Observable<Problem> {
    let url = this.ideasUrl + "/" + id;
    /*let params = new URLSearchParams();
     params.set('id', id.toString()); // the user's search value*/
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
  }

  addProblem(problem: Problem): Promise<Problem> {
    let body = JSON.stringify(problem);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.authHttp.post(this.ideasUrl, body, {headers: headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
