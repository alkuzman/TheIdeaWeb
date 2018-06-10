import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by Viki on 1/25/2017.
 */
import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Agent} from '../../model/authentication';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {AgentFilterProperties} from './agent-filter.properties';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';

@Injectable()
export class AgentService {
  private agentsUrl = "/api/agents";

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
    return observableThrowError(error);
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public getAgents(filterProperties: AgentFilterProperties): Observable<Agent[]> {
    const params = PropertiesToUrlSearchParams.transform(filterProperties);
    return this.http.get(this.agentsUrl, {headers: this.getHeaders(), search: params}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }
}
