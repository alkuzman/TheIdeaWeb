/**
 * Created by AKuzmanoski on 15/01/2017.
 */
import {Injectable} from "@angular/core";
import {Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {PropertiesToUrlSearchParams} from "../../shared/utils/properties-to-url-search-params";
import {LimitProperties} from "./limit.properties";
import {JwtHttpService} from "../authentication/jwt/jwt-http.service";
import {Idea} from "../../domain/model/ideas/idea";
import {IdeaAnalysis} from "../../domain/model/analyzers/analysis/idea-analysis";
import {IdeaLite} from "../../domain/model/analyzers/idea-lite";
import {Solution} from "../../domain/model/ideas/solution";
import {Problem} from "../../domain/model/ideas/problem";
import {ProblemAnalysis} from "../../domain/model/analyzers/analysis/problem-analysis";
import {ProblemLite} from "../../domain/model/analyzers/problem-lite";
@Injectable()
export class AnalyzerService {
  private analyzersUrl: string = "/processing/analyzers";

  constructor(private http: JwtHttpService) {

  }

  public analyzeIdea(idea: Solution): Observable<IdeaAnalysis> {
    let ideaLite: IdeaLite = new IdeaLite(idea);
    let body = JSON.stringify(ideaLite);
    let url: string = this.analyzersUrl + "/idea";
    return this.http.post(url, body, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  public calculatePopularity(text: String): Observable<number> {
    let body = JSON.stringify(text);
    let url: string = this.analyzersUrl + "/popularity";
    return this.http.post(url, body, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }

  public getSymilarDocuments(text: String, filter: LimitProperties): Observable<number> {
    let body = JSON.stringify(text);
    let props = PropertiesToUrlSearchParams.transform(filter);
    let url: string = this.analyzersUrl + "/similarity";
    return this.http.post(url, body, {headers: this.getHeaders(), search: props})
      .map((response: Response) => this.extractDocumentData(response))
      .catch((error: any) => this.handleError(error));
  }

  private extractDocumentData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || 0;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  analyzeProblem(problem: Problem): Observable<ProblemAnalysis> {
    let problemLite: ProblemLite = new ProblemLite(problem);
    let body = JSON.stringify(problemLite);
    let url: string = this.analyzersUrl + "/problem";
    return this.http.post(url, body, {headers: this.getHeaders()})
      .map((response: Response) => this.extractData(response))
      .catch((error: any) => this.handleError(error));
  }
}
