import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Inject, Injectable} from '@angular/core';
import {Member} from '../../model/authentication';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';
import {Headers, Response} from '@angular/http';

/**
 * Created by Viki on 2/16/2017.
 */


@Injectable()
export class MemberService {

  membersUrl = '/api/members';

  constructor(@Inject(JwtHttpService) private http: JwtHttpService) {
  }

  save(member: Member): Observable<Member> {
    const body = JSON.stringify(member);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.membersUrl, body, {headers: headers}).pipe(
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
