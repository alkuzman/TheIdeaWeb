import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 11/10/2016.
 */
import {Injectable} from '@angular/core';
import {Idea} from '../../model/ideas';
import {Headers, Response} from '@angular/http';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {IdeasFilterProperties} from '../../idea/params/ideas-filter.properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';


@Injectable()
export class IdeaService {
  private ideasUrl = '/api/ideas';

  constructor(private http: JwtHttpService) {

  }

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getIdeas(filterProperties: IdeasFilterProperties): Observable<Idea[]> {
    const params = PropertiesToUrlSearchParams.transform(filterProperties);
    return this.http.get(this.ideasUrl, {headers: this.getHeaders(), search: params}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getIdea(id: number): Observable<Idea> {
    const url = this.ideasUrl + '/' + id;
    /*let params = new URLSearchParams();
     params.set('id', id.toString()); // the user-pages's search value*/
    return this.http.get(url, {headers: this.getHeaders()}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  addIdea(idea: Idea): Observable<Idea> {
    const body = JSON.stringify(idea);
    return this.http.post(this.ideasUrl, body, {headers: this.getHeaders()}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
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
    return observableThrowError(error);
  }
}
