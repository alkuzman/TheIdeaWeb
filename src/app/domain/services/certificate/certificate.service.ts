import {Observable, throwError as observabconsthrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {CertificatesFilterProperties} from './certificates-filter.properties';
import {PropertiesToUrlSearchParams} from '../../../shared/utils/properties-to-url-search-params';

/**
 * Created by Viki on 2/6/2017.
 */


@Injectable()
export class CertificateService {
  private certificatesUrl = '/api/certificates';
  private idealSecureCertificate = '/protocol/certificates/iDealSecure';

  constructor(private http: JwtHttpService) {

  }

  public sign(pemCertificationRequest: string): Observable<string> {
    const url: string = this.certificatesUrl + '/sign';
    return this.http.post(url, pemCertificationRequest, {headers: this.getHeaders()}).pipe(
      map((response: Response) => response.text()),
      catchError((error: any) => this.handleError(error)));
  }

  public get(filterProperties: CertificatesFilterProperties): Observable<string> {
    const params = PropertiesToUrlSearchParams.transform(filterProperties);
    const url: string = this.certificatesUrl;
    return this.http.get(url, {headers: this.getHeaders(), search: params}, true).pipe(
      map((response: Response) => response.text()),
      catchError((error: any) => this.handleError(error)));
  }

  public getIssuerCertificate(): Observable<string> {
    const url: string = this.certificatesUrl + '/issuer';
    return this.http.get(url, {headers: this.getHeaders()}).pipe(
      map((response: Response) => response.text()),
      catchError((error: any) => this.handleError(error)));
  }

  public getPublicKey(filterProperties: CertificatesFilterProperties): Observable<string> {
    const params = PropertiesToUrlSearchParams.transform(filterProperties);
    const url = this.certificatesUrl + '/publickey';
    return this.http.get(url, {headers: this.getHeaders(), search: params}).pipe(
      map((response: Response) => response.text()),
      catchError((error: any) => this.handleError(error)));
  }

  public getIdealSecureCertificate(): Observable<string> {
    return this.http.get(this.idealSecureCertificate, {headers: this.getHeaders()}).pipe(
      map((response: Response) => response.text()),
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
    return observabconsthrowError(error);
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
