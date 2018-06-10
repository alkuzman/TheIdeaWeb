import {Observable, throwError as observabconsthrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 07/03/2017.
 */
import {Injectable} from '@angular/core';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {SolutionQuality} from '../../model/analyzers/analysis/solution-quality';
import {Headers, Response} from '@angular/http';
import {Award} from '../../model/awards/award';
import {Badge} from '../../model/awards/badges/badge';

@Injectable()
export class AwardService {
  private awardsUrl = "/api/awards";

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

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public generateAwards(solutionQuality: SolutionQuality): Observable<Award<Badge<any, any>>[]> {
    const url: string = this.awardsUrl + "/factory";
    const body = JSON.stringify(solutionQuality);
    return this.http.post(url, body, {headers: this.getHeaders()}).pipe(
      map((response: Response) => this.extractData(response)),
      catchError((error: any) => this.handleError(error)));

  }
}
