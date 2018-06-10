import {Observable, throwError as observabconsthrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {Headers, Response} from '@angular/http';
import {Currency} from '../../model/helpers/currency';

/**
 * Created by Viki on 2/21/2017.
 */


@Injectable()
export class CurrencyService {
  private currenciesUrl = "/api/currencies";

  constructor(private http: JwtHttpService) {
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
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

  public getCurrencies(): Observable<Currency[]> {
    return this.http.get(this.currenciesUrl, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));
  }

}
