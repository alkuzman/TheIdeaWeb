import {Observable, throwError as observabconsthrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Injectable} from '@angular/core';
import {Shareable} from '../../model/sharing/shareable';
import {Response} from '@angular/http';
import {JwtHttpService} from '../../../core/authentication/jwt/jwt-http.service';

@Injectable()
export class SharableService {
  private sharableUrl = '/api/shareables';

  constructor(private http: JwtHttpService) {

  }

  getSharableById(id: number): Observable<Shareable> {
    const url: string = this.sharableUrl + '/' + id;
    return this.http.get(url).pipe(
      map((response: Response) => this.handleRequest(response)),
      catchError((error: any) => this.handleError(error)));
  }


  handleRequest(response: Response): Shareable {
    return response.json();
  }

  handleError(error: any) {
    return observabconsthrowError(error);
  }
}
