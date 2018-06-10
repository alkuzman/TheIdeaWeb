import {Observable, throwError as observabconsthrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {SearchableFilterProperties} from './searchable-filter.properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';
import {Searchable} from '../../model/sharing/searchable';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';

/**
 * Created by AKuzmanoski on 20/01/2017.
 */
@Injectable()
export class SearchableService {
  private searchableUrl = '/api/search';

  constructor(private http: JwtHttpService) {

  }

  public getResults(filter: SearchableFilterProperties): Observable<Searchable[]> {
    const params = PropertiesToUrlSearchParams.transform(filter);
    return this.http.get(this.searchableUrl, {headers: this.getHeaders(), search: params}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
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
    return observabconsthrowError(error);
  }
}
