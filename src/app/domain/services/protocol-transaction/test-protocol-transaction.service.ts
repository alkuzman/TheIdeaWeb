import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';

import {Injectable} from '@angular/core';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {Headers, Response} from '@angular/http';
import {UserService} from '../user/user.service';

@Injectable()
export class TestProtocolTransactionService {

  private url = '/protocol/test';

  constructor(private http: JwtHttpService,
              private userService: UserService) {
  }

  public sendForDecryption(encryptedText: string): Observable<string> {
    const url: string = this.url + '/decrypt?email=' + this.userService.getAuthenticatedUser().email +
      '&applicationName=iDeal';
    return this.http.post(url, encryptedText, {headers: this.getHeaders()}).pipe(
      map((res: Response) => this.extractRawData(res)),
      catchError((error: any) => this.handleError(error)));
  }

  public sendForAsynchronousDecryption(data: string): Observable<string> {
    const url: string = this.url + '/decrypt/key';
    return this.http.post(url, data, {headers: this.getHeaders()}).pipe(
      map((res: Response) => this.extractRawData(res)),
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
