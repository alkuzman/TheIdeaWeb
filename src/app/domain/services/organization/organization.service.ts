import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Inject, Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Organization} from '../../model/authentication';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';

/**
 * Created by Viki on 11/25/2016.
 */

@Injectable()
export class OrganizationService {
  organizationsUrl = '/api/organizations';

  constructor(@Inject(JwtHttpService) private http: JwtHttpService) {
  }

  addOrganization(organization: Organization): Observable<Organization> {
    const body = JSON.stringify(organization);
    console.log(organization);
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.organizationsUrl, body, {headers: headers}).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return observableThrowError(error);
  }
}
