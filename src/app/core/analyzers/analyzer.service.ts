import {Observable, throwError as observabconsthrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 15/01/2017.
 */
import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {PropertiesToUrlSearchParams} from '../../shared/utils/properties-to-url-search-params';
import {LimitProperties} from './limit.properties';
import {JwtHttpService} from '../authentication/jwt/jwt-http.service';
import {IdeaAnalysis} from '../../domain/model/analyzers/analysis/idea-analysis';
import {IdeaLite} from '../../domain/model/analyzers/idea-lite';
import {Problem, Solution} from '../../domain/model/ideas';
import {ProblemAnalysis} from '../../domain/model/analyzers/analysis/problem-analysis';
import {ProblemLite} from '../../domain/model/analyzers/problem-lite';
import {Keyword} from '../../domain/model/ideas/keyword';
import {SolutionQuality} from '../../domain/model/analyzers/analysis/solution-quality';

@Injectable()
export class AnalyzerService {
  private analyzersUrl = '/processing/analyzers';

  constructor(private http: JwtHttpService) {

  }

  public analyzeIdea(idea: Solution): Observable<IdeaAnalysis> {
    const ideaLite: IdeaLite = new IdeaLite(idea);
    const body = JSON.stringify(ideaLite);
    const url: string = this.analyzersUrl + '/idea';
    return this.http.post(url, body, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public calculatePopularity(text: String): Observable<number> {
    const body = JSON.stringify(text);
    const url: string = this.analyzersUrl + '/popularity';
    return this.http.post(url, body, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public getSymilarDocuments(text: String, filter: LimitProperties): Observable<number> {
    const body = JSON.stringify(text);
    const props = PropertiesToUrlSearchParams.transform(filter);
    const url: string = this.analyzersUrl + '/similarity';
    return this.http.post(url, body, {headers: this.getHeaders(), search: props}).pipe(
      map((response: Response) => this.extractDocumentData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  analyzeProblem(problem: Problem): Observable<ProblemAnalysis> {
    const problemLite: ProblemLite = new ProblemLite(problem);
    const body = JSON.stringify(problemLite);
    const url: string = this.analyzersUrl + '/problem';
    return this.http.post(url, body, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getIdeaKeywords(ideaLite: IdeaLite): Observable<Keyword[]> {
    const body = JSON.stringify(ideaLite);
    const url: string = this.analyzersUrl + '/idea/keywords';
    return this.http.post(url, body, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getProblemKeywords(problem: Problem) {
    const problemLite: ProblemLite = new ProblemLite(problem);
    const body = JSON.stringify(problemLite);
    const url: string = this.analyzersUrl + '/problem/keywords';
    return this.http.post(url, body, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getSolutionQuality(solution: Solution): Observable<SolutionQuality> {
    const ideaLite: IdeaLite = new IdeaLite(solution);
    const body = JSON.stringify(ideaLite);
    const url: string = this.analyzersUrl + '/solutionQuality';
    return this.http.post(url, body, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  private extractDocumentData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || 0;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return observabconsthrowError(error);
  }
}
