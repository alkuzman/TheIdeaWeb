import {Observable, throwError as observabconsthrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Problem} from '../../model/ideas/problem';
import {ProblemListFilterProperties} from '../../problem/params/problem-list-filter.properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';


@Injectable()
export class ProblemService {
  private problemsUrl = "/api/problems";

  constructor(private http: JwtHttpService) {

  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return observabconsthrowError(error);
  }

  getProblems(properties: ProblemListFilterProperties): Observable<Problem[]> {
    const params = PropertiesToUrlSearchParams.transform(properties);
    return this.http.get(this.problemsUrl, {search: params}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getProblem(id: number): Observable<Problem> {
    const url = this.problemsUrl + "/" + id;
    /*const params = new URLSearchParams();
     params.set('id', id.toString()); // the user-pages's search value*/
    return this.http.get(url, undefined, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  addProblem(problem: Problem): Observable<Problem> {
    const body = JSON.stringify(problem);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.problemsUrl, body, {headers: headers}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }
}
