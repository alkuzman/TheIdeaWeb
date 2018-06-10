import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {SecurityProfile} from '../../model/security/security-profile';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {CertificateType} from '../../model/enumerations';

/**
 * Created by Viki on 2/6/2017.
 */


@Injectable()
export class SecurityProfileService {
  private securityprofilesUrl = '/api/securityprofiles';

  constructor(private http: JwtHttpService) {

  }

  public save(securityProfile: SecurityProfile): Observable<SecurityProfile> {
    return this.http.post(this.securityprofilesUrl, JSON.stringify(securityProfile), {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public getAuthenticatedUserSecurityProfile(type: CertificateType): Observable<SecurityProfile> {
    // let fragment: string = this.securityprofilesUrl + "/" + CertificateType[type];
    const url: string = this.securityprofilesUrl;
    return this.http.get(url, {headers: this.getHeaders()}, true).pipe(
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

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
