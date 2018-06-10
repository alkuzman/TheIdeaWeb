import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {Headers, Response} from '@angular/http';
import {Epoid} from '../../model/security/data/epoid';
import {ProtocolSession} from '../../model/security/protocol-session';

@Injectable()
export class ProtocolTransactionService {
  private epoidUrl = '/protocol/epoid';
  private sessionKeyWithServerUrl = '/protocol/keys';
  private transactionUrl = '/api/protocoltransactions';
  private transactionRequestUrl = '/protocol/transactions';

  constructor(private http: JwtHttpService) {

  }

  public getNewEpoid(merchant: string): Observable<Epoid> {
    const url = this.epoidUrl + '/new?merchant=' + merchant;
    return this.http.get(url, {headers: this.getHeaders()}, false).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public saveProtocolSession(protocolSession: ProtocolSession): Observable<ProtocolSession> {
    const url = this.transactionUrl + '/session/' + protocolSession.id;
    const body = JSON.stringify(protocolSession);
    return this.http.put(url, body, {headers: this.getHeaders()}, true).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public getSessionKeyWithServer(email: string): Observable<string> {
    const url = this.sessionKeyWithServerUrl + '?email=' + email + '&applicationName=iDeal';
    return this.http.get(url, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractRawData(response)),
      catchError((error: any) => this.handleError(error)));
  }

  public sendTransactionRequestToServer(jsonMessage: string, email: string): Observable<string> {
    const url = this.transactionRequestUrl + '?email=' + email + '&applicationName=iDeal';
    return this.http.post(url, jsonMessage, {headers: this.getHeaders()}).pipe(
      map((response: Response) => response.text()),
      catchError((error: any) => this.handleError(error)));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private extractRawData(res: Response): string {
    return res.text() || '';
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
